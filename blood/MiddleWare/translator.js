
import * as Translate from '@google-cloud/translate'
const projectId="blood-project"
const translate = new Translate({ projectId });
export async function translator(req,res,next) {
    
    try{
      for(const key in req.body){
          const value=req.body[key];
          
        if(typeof value=="string"){
          
          const [detectLanguage]=await translate.detect(value)
          
           console.log(detectLanguage)
          if(detectLanguageLanguage=="bn"){
            const translation=await translate(value,{to:"en"});
            req.body[key]=translation.text;
          }
       
        }
      }
      next()
      
    }
    catch (e) {
      
      next(e)
      
    }
}

