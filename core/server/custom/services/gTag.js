const {google} = require('googleapis');
const TAGMANAGER = google.tagmanager('v2');
const {knex} = require('../../data/db');

//Scope of Google Apis or Access of the APIs
const SCOPES = [
    'https://www.googleapis.com/auth/tagmanager.edit.containers',
    'https://www.googleapis.com/auth/tagmanager.manage.accounts',
    'https://www.googleapis.com/auth/tagmanager.readonly',
    'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
    'https://www.googleapis.com/auth/tagmanager.publish'
];

//Authenticate from Google
const GAuthenticate = async () => {

    let json_token = await knex.select("json_sec_key").where("status", true).from("google_security_keys").limit(1);
    // console.log(json_token[0].json_sec_key)
    //
    if (json_token && json_token.length) {
        const SEC_KEY = JSON.parse(json_token[0].json_sec_key);

        const gAUTH = new google.auth.GoogleAuth({
            // Scopes can be specified either as an array or as a single, space-delimited string.
            scopes: SCOPES,
            // KeyFile can be downloaded from Google Analytics as .JSON or .P12
            credentials: SEC_KEY
        });
        return gAUTH.getClient().then((authClient) => (google.options({ auth: authClient })));

    }
    // return res.send({ "json": g });
}

// Just checking if its working fine or not.
exports.getAllTags = async (gTag) => {
    return TAGMANAGER.accounts.containers.workspaces.tags.list({
        parent:
            `accounts/${gTag.account_id}/containers/${gTag.container_id}/workspaces/${gTag.workspace_id}`,
    })
}

const createTrigger = async (gTag, textValue, UrlValue) => (
    TAGMANAGER.accounts.containers.workspaces.triggers.create({
        parent:
            `accounts/${gTag.account_id}/containers/${gTag.container_id}/workspaces/${gTag.workspace_id}`,

        requestBody: {
            "name": textValue,  // button text
            "type": "click",
            "filter": [
                {
                    "type": "equals",
                    "parameter": [
                        {
                            "type": "template",
                            "key": "arg0",
                            "value": "{{Click Text}}"
                        },
                        {
                            "type": "template",
                            "key": "arg1",
                            "value": textValue
                        }
                    ]
                },
                {
                    "type": "equals",
                    "parameter": [
                        {
                            "type": "template",
                            "key": "arg0",
                            "value": "{{Click URL}}"
                        },
                        {
                            "type": "template",
                            "key": "arg1",
                            "value": UrlValue
                        }
                    ]
                }

            ],
        }

    })
)

const createTag = async (gTag, triggerId, tagName, CTAText) => (
    TAGMANAGER.accounts.containers.workspaces.tags.create({
        parent:
            `accounts/${gTag.account_id}/containers/${gTag.container_id}/workspaces/${gTag.workspace_id}`,

        requestBody: {
            "name": tagName,
            "type": "ua",
            "parameter": [
                {
                    "type": "boolean",
                    "key": "nonInteraction",
                    "value": "false"
                },
                {
                    "type": "boolean",
                    "key": "overrideGaSettings",
                    "value": "false"
                },
                {
                    "type": "template",
                    "key": "eventCategory",
                    "value": CTAText // button text
                },
                {
                    "type": "template",
                    "key": "trackType",
                    "value": "TRACK_EVENT"
                },
                {
                    "type": "template",
                    "key": "gaSettings",
                    "value": "{{Google Analytics}}"
                },
                {
                    "type": "template",
                    "key": "eventAction",
                    "value": "{{Click Text}}"
                },
                {
                    "type": "template",
                    "key": "eventLabel",
                    "value": "{{Page URL}}"
                }
            ],
            "firingTriggerId": [
                triggerId
            ],
            "tagFiringOption": "oncePerEvent",
            "monitoringMetadata": {
                "type": "map"
            }
        }

    })
)

const getLatestWorkspace = async (gTag) => (
    TAGMANAGER.accounts.containers.workspaces.list({
        parent:
            `accounts/${gTag.account_id}/containers/${gTag.container_id}`,
    })
)

const createVersion = async (gTag, CTAText) => (
    TAGMANAGER.accounts.containers.workspaces.create_version({
        path:
            `accounts/${gTag.account_id}/containers/${gTag.container_id}/workspaces/${gTag.workspace_id}`,
    })
)

const publishWorkspace = async (gTag, versionId) => (
    TAGMANAGER.accounts.containers.versions.publish({
        path:
            `accounts/${gTag.account_id}/containers/${gTag.container_id}/versions/${versionId}`,
    })
)

const saveGTags = (gTag, latestWorkspaceId, latestVersionId) => (
     knex('google_tag_versions').insert({
        account_id: gTag.account_id,
        container_id: gTag.container_id,
        workspace_id: latestWorkspaceId,
        version_id: latestVersionId
    })
)

exports.getGTags = async () => {
    // we can use Ghost's Bookshelf as well but for this task its good to go in simple way.
    //  Fetching last record from `Google Tag Version`
    return await knex.select("").from("google_tag_versions")
        .orderBy('updated_at', "DESC").limit(1);
}

exports.pushTagsNdTriggers = async (Gtag, url, btn_txt) => {
    let latestWorkspaceID = 0, latestVersionId = 0;

    // return new Promise((resolve, reject) => (
    
    return GAuthenticate()
        .then(()=>(createTrigger(Gtag, btn_txt, url))) 
        .then((triggerRes) => {
            if (triggerRes.status == 200) {
                //    console.log("CREATED Trigger",triggerRes.status,triggerRes.data)
                let triggerId = triggerRes.data.triggerId;
                return createTag(Gtag, triggerId, btn_txt + " CTA", btn_txt)
            }
            return reject(res)
        })
        .then((tagRes) => (
            (tagRes.status == 200)
                ?
                createVersion(Gtag, btn_txt + " CTA")
                :
                reject(tagRes)

        ))
        .then((versionRes) => {
            if (versionRes.status == 200) {
                latestVersionId = versionRes.data.containerVersion.containerVersionId;
                return publishWorkspace(Gtag, latestVersionId)
            }
            return reject(versionRes)

        })
        .then((PubRes) => (
            PubRes.status == 200
                ?
                getLatestWorkspace(Gtag)
                :
                reject(PubRes)
        ))
        .then((latestRes) => {
            if (latestRes.status == 200) {
                // console.log("RES",latestRes.data.workspace[0]);
                latestWorkspaceID = latestRes.data.workspace[0].workspaceId;
                return saveGTags(Gtag, latestWorkspaceID, latestVersionId)
            }
            return reject(latestRes)

        })
        .then((gTagRes)=>(gTagRes))
}
