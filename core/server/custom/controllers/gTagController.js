const  { getAllTags, getGTags, pushTagsNdTriggers} = require('../services/gTag');


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
           let { url, btn_txt } = request.body;
           const G_TAGs = await getGTags();
           
           if(G_TAGs && G_TAGs.length){
               let Gtag = G_TAGs[0];

               return pushTagsNdTriggers(Gtag, url, btn_txt)
                .then((tagsNdTriggersRes) => (
                        (tagsNdTriggersRes) 
                        ?
                            response.status(200).send({"message": "CTA Created Successfully!"})
                        :
                            response.status(500).send({ "error": [{ "message": "Something went wrong, please try again!" }] })
                ))
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
    }
}

