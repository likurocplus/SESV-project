//feature: get lastest tutorials list
//inout: none of input
//process:
//- wait fetch api from sesv to get reponse
//- convert reponse to Object
//- query data from Object to got data dataTutorials
//- call display func
//output: the list display in screen
const getLatestTutorials = async () => {
    //1/fetch API
    //The original API is https://www.sesvtutorial.com/page-data/tutorials/page-data.json. Fetch it return a CORS error., there are two ways to fix this:
    //    1. Disabling CORS on the client-side, but this is very inconvenient because not everyone wants to disable it.
    //    2. Fixing it on the server-side. However, since this API belongs to SESV, I don't have the permissions to modify the server.
    // Therefore, I created a fake server to fetch SESV data(Servers are not bound by CORS (CORS is just a security measure applied by browsers to protect users, and only browsers follow CORS). Therefore, from another server, we can fetch the API and configure 
    // the fake server to set the Access-Control-Allow-Origin header so that the browser can proceed.) 
    // and fetch the data back from this fake server to resolve the CORS issue.
  let response = await fetch(
    "https://mocki.io/v1/2f27ece2-ff49-4c13-bba1-3901e2a29c99" //fake API JSON
  );
    
  //2/convert resp to Object
  let resultObject = await response.json();
    
  //3/get data latest tutorials of Object
  let dataTutorials = resultObject["result"]["data"]["posts"]["edges"];
    
  //4/call display func
  displayLatestTutorials(dataTutorials);
};


//feature: display list to browser
//input: data latest tutorials object
//process: 
//-loop each element in list to get title and slug
//-create anchor element, inner text = title and set atrribute href = https://www.sesvtutorial.com/slug
//-appendChild Node to div content 
//output: the list display in screen
const displayLatestTutorials = (dataTutorials) => {

    dataTutorials.forEach((element) => {

        //1. create anchor element to contain link and title
        let titleElement = document.createElement("a");
        let modal = document.getElementById("modal")

        //2.set attribute id = lession-title to use css
        titleElement.setAttribute("id", "lession-title");

        //3. inner text to anchor
        titleElement.innerText = `${element["node"]["frontmatter"]["title"]}`;
        
        //4. add event show modal to titleElement
        titleElement.addEventListener('click',()=>{

          //5. if click point at titleElement then show modal
          modal.showModal();

          //6. set yes button if user choose then go to SESV lession
          document.getElementById("yes-button-a").setAttribute(
            "href",
            `https://www.sesvtutorial.com${element["node"]["fields"]["slug"]}`
          );

          //7. set no button if user choose then close modal
          document.getElementById("no-button").addEventListener('click',()=>{

            //close modal pop-up
            modal.close();
          })
        })

        //append node to content id
        document.getElementById("content").appendChild(titleElement);
      });
}
//call to get and display list to screen
getLatestTutorials();
