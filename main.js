//feature: get lastest tutorials list
//inout: none of input
//process:
//- wait fetch api from sesv to get reponse
//- convert reponse to Object
//- query data from Object to got data dataTutorials
//- call display func
//output: the list display in screen
const getLatestTutorials = async () => {
    //fetch API
  let response = await fetch(
    "https://www.sesvtutorial.com/page-data/tutorials/page-data.json"
  );
  //convert resp to Object
  let resultObject = await response.json();
  //get data latest tutorials of Object
  let dataTutorials = resultObject["result"]["data"]["posts"]["edges"];
  //call display func
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
        //create anchor element to contain link and title
        let titleElement = document.createElement("a");
        let modal = document.getElementById("modal")
        //set attribute id = lession-title to use css
        titleElement.setAttribute("id", "lession-title");
        //inner text to anchor
        titleElement.innerText = `${element["node"]["frontmatter"]["title"]}`;
        
        //add event show modal to titleElement
        titleElement.addEventListener('click',()=>{
          //if click point at titleElement then show modal
          modal.showModal();
          //set yes button if user choose then go to SESV lession
          document.getElementById("yes-button-a").setAttribute(
            "href",
            `https://www.sesvtutorial.com${element["node"]["fields"]["slug"]}`
          );
          //set no button if user choose then close modal
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
