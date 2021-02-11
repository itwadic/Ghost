const  { getAllTags, getGTags, pushTagsNdTriggers} = require('../services/gTag');
const {knex} = require('../../data/db');

module.exports  = {
    get: async (request,response) => {
        try{
            const G_TAGs = await getGTags();
            console.log(G_TAGs)
            if (G_TAGs && G_TAGs.length) {
                let Gtag = G_TAGs[0];
                GAuthenticate().then(async (res) => {
                    let tags = await getAllTags(Gtag);
                    // console.error(tags);
                    if(tags) 
                        return response.status(200).send({"tags":tags.data.tag})//res.send({"tags":tags});
                }).catch((err) => {
                    console.error("GAUTHENTICATE", err);
                    return response.status(500).send({ "message": err.message })
                })
            }
        }catch(e){
            return response.status(500).send({"message":e.errors})
        }
    },
    pushGTag: async (request,response) => {
       try{
           let { url, btn_txt, cta} = request.body;
           const G_TAGs = await getGTags();

           if(G_TAGs && G_TAGs.length){
               let Gtag = G_TAGs[0];

               return pushTagsNdTriggers(Gtag, url, btn_txt)
                .then((tagsNdTriggersRes) => {
                        if(tagsNdTriggersRes) {
                            
                            knex('cta_button_list').insert({
                                cta_name: btn_txt,
                                cta: cta
                            }).then( function (result) {});
                            
                            response.status(200).send({"message": "CTA Created Successfully!"})
                        }else {
                            response.status(500).send({ "error": [{ "message": "Something went wrong, please try again!" }] })
                        }
                })
                .catch((err)=> {
                    console.error("PUSHGTAG->",err);
                    return response.status(500).send({"error":err.errors})
                })
            }
            else
               return response.status(500).send({ "error": [{ "message": "No credentials found!"}] })               
       }catch(e){
           console.error("Error Generated",e);
           return response.status(400).send({ "error": "Something went wrong" })
       }
    },
    getCtaList: async (request, response) => {
    
        const list = await knex.select("").from("cta_button_list")
            .orderBy('created_at', "DESC");

        response.status(200).send({"list": list})
    },    
    getCta: async (request, response) => {
        let { id } = request.query; 
        const cta = await knex.select("cta").from("cta_button_list")
            .where('id', id).limit(1);

        response.status(200).send({"record": cta[0]})
    }
}

