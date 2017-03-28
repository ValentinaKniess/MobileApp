function MenuChoice(selection)
{
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "none";
    document.getElementById("section3").style.display = "none";
    switch (selection)
    {
        case "Section 1":
            GetCustomers();          //calls the function that crestes the customer list
            document.getElementById("section1").style.display = "block";    //makes the 1st section (customer list) visable
            break;
        case "Section 2":
            document.getElementById("section2").style.display = "block";
            break;
        case "Section 3":
            document.getElementById("section3").style.display = "block";
            break;
        case "None":            //No menu item selected, so no section should be displayed
            break;
            default:
            alert("Please select a different menu option");
    }
}
function GetCustomers()
{
    var objRequest = new XMLHttpRequest();  //Creates the AJAX request object
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers";   //Creates a variable for the long URL.
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateInfo(output);
        }
    }
     //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}
function GenerateInfo(result)
{
    var count = 0;
    var displayinfo ="<table><tr><th>Customer ID, </th><th>Company Name, </th><th>City,</th></tr>";   //creates table header
    
    for (count = 0; count < result.GetAllCustomersResult.length; count++)
    {
        displayinfo += "<tr><td>" + result.GetAllCustomersResult[count].CustomerID + "</td><td>" + result.GetAllCustomersResult[count].CompanyName + "</td><td>" + result.GetAllCustomersResult[count].City + "</td></tr>";
    }
    displayinfo += "</table>";
    document.getElementById("customerlist").innerHTML = displayinfo;
}

function GetOrders()
{
    var objRequest = new XMLHttpRequest();  //Creates the AJAX request object
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
        //Creates a variable for the long URL. The "/" at the end leaves a space for the user input (to retrieve their querry)
    url += document.getElementById("customerid").value;
        //Tacks on the end of the URL what the customer is looking for (here a company ID retrieved from the input field in HTML)
    
        //Checks for a response and the server status, then parses the data with object
        
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    }
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}
function GenerateOutput(result)
{
    var count = 0;
    var displaytext ="<table><tr><th>Product Name,</th><th>Item Total</th></tr>";  //creates table header
    
    for (count = 0; count < result.length; count++)
    {
        displaytext += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
    }
    displaytext += "</table>";
    document.getElementById("orderhistory").innerHTML = displaytext;
}
