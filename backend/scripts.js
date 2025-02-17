import express from"express";
import { pipeline, env } from '@huggingface/transformers';

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/',(req,res)=>{
console.log("abhijan");
res.send('Hello, Express with ESM!');
})
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);

});
