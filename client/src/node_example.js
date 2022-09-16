/*

Autocode is a wrapper for AWS Lambda ("serverless") functions, 
which are functions called directly from an http request. While 
Autocode is far from the only serverless function game in town, 
it's definitely the easiest and quickest to get going. 

https://autocode.com/

The biggest catch with Autocode is that they haven't really put a 
lot of effort into Git integration, and their IDE provides a very poor 
developer experience. Serverless options requiring a little more configuration 
can be included as part of a project deployed to Netlify (through
Netlify Edge functions: https://docs.netlify.com/edge-functions/overview/ ) or 
via the awesome React framework, Next.js, via their 
"API functions" (https://nextjs.org/docs/api-routes/introduction). 

Note that serverless functions may seem magical, but they ARE NOT FREE. This
make sense since most of them are effectively wrappers for AWS Lambda functions, 
a paid service.  Most of the above services have very generous free tiers, 
but if your app picks up in popularity, you can expect to start paying for your service. 

They are a way to handle API requests or other 
remote logic without needing the overhead of a true backend 
such as Rails, Sinatra, Flask, or even a Node.js server running Express.

For those of you still scratching your head aboute Node.js,
it's way simpler than you think: it's just JavaScript running 
OUTSIDE THE BROWSER. This means that some of the things we take
for granted in JavaScript such as the fetch API or FormData API
are not automatically available, and our console.logs go to our terminal
console instead of a browser console, but otherwise it's: just freaking JavaScript. 
*/

const ImageKit = require("imagekit");

/* 
context.params is part of Autocode. Whatever your serverless
function receives in the http request will be found in context.params
*/
const payload = context.params;

/*
Like create-react-app and Vite, Autocode has its own methodology
for handling environment variables out of the box. 
Since Imagekit is a paid service with limits that threaten your free tier,
it's imperative you obscure your API keys, as with any other API keys, by
containing them in environment variables.

To enter environment variables in Autocode, there is a button labelled accordingly 
on the bottom LEFT corner of every project.
*/

const ik_host = process.env.IK_HOST;
const ik_private_key = process.env.IK_PRIVATE_KEY;
const ik_public_key = process.env.IK_PUBLIC_KEY;

var imagekit = new ImageKit({
  publicKey: ik_public_key,
  privateKey: ik_private_key,
  urlEndpoint: ik_host,
});

const { file, fileName } = payload;

let ik_upload = await imagekit.upload({
  file: file, //required
  fileName: fileName, //required
  extensions: [
    // extensions are optional. the google auto
    // tagging extension here is just what
    // ImageKit includes in their tutorial code,
    // but it's really cool and works like magic
    // in my experience-- although I've never tried to
    // TRICK it, so your mileage may vary.
    {
      name: "google-auto-tagging",
      maxTags: 5,
      minConfidence: 95,
    },
  ],
});

console.log("IK Upload Result: ", ik_upload);
// Note that this returns a non-serialized value directly from ImageKit.
// In your own projects, you may not wish to return the full firehose of data
// from ImageKit, so you may wish to extract the desired data from your
// response value and pass THAT to the front-end.
return ik_upload;
