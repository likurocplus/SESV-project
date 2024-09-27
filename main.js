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
        //set attribute id = lession-title to use css
        titleElement.setAttribute("id", "lession-title");
        //set attribute href
        titleElement.setAttribute(
          "href",
          `https://www.sesvtutorial.com${element["node"]["fields"]["slug"]}`
        );
        //inner text to anchor
        titleElement.innerText = `${element["node"]["frontmatter"]["title"]}`;
        //append node to content id
        document.getElementById("content").appendChild(titleElement);
      });
}
//call to get and display list to screen
getLatestTutorials();
