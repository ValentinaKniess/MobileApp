function MenuChoice(selection)
{
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "none";
    document.getElementById("section3").style.display = "none";
    document.getElementById("section4").style.display = "none";
    switch (selection)
    {
        case "Section 1":
        ListCustomers();  //calls the function that crestes the customer list
        document.getElementById("section1").style.display = "block"; //makes the 1st section (customer list) visable
        break;
        case "Section 2":
        document.getElementById("section2").style.display = "block";  //makes the 2nd section (order list) visable
          //call the function that creates the order list
        break;
        case "Section 3":
            document.getElementById("section3").style.display = "block";
            break;
        case "Section 4":
        document.getElementById("section4").style.display = "block";  //makes the 3rd section (about) visable
        break;
        case "None":            //No menu item selected, so no section should be displayed
        break;
        default:
            alert("Please select a menu option");
    }
}

function ListCustomers()  //This sends a request to the getAllCustomers service and creates a table with the data returned
{
     var xmlhttp = new XMLHttpRequest(); //Creates the XMLHttpRequest object
     var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers"; //URL for the service
     
     xmlhttp.onreadystatechange = function() //creates an event handler for the service request
     {
         if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
         {
            var output = JSON.parse(xmlhttp.responseText); //Captures the data returned form the service and puts in an object
            GenerateOutput(output); //Calls the function that creates the output table and passes the data object to it
         }
    }
       xmlhttp.open("GET", url, true); //Sets the options for requesting the service
       xmlhttp.send();  //Calls the service
       
        function GenerateOutput(result) //This function receives the data form the service and creates a table to display it
        {
            var display = "<table><tr><th>Update</th><th>Customer ID</th><th>Company Name</th><th>Company City</th></tr>"; //Table Headings
            var count = 0; //Count variable to loop
            var customerid = ""; //Variable to store the Customer ID
            var companyname = ""; //Variable to store the Company Name
            var companycity = ""; //Variable to store the Company City
            
            for(count = 0; count < result.GetAllCustomersResult.length; count ++) //Loop for creating table rows
            {
                //Anchor link: <a href="javascript:function("parameter");"> 
                  customerid = result.GetAllCustomersResult[count].CustomerID; //Assigns the Customer ID to a variable
                  companyname ='<a href="javascript:Orders('+"'"+customerid	+"');"+'">';  //Assign hyperlink and store id
                  companyname += result.GetAllCustomersResult[count].CompanyName;
                  companyname +='</a>';
                  companycity = result.GetAllCustomersResult[count].City; //Assigns the City to a variable
                  display += '<tr><td><button onclick="StoreInfo(' + "'" + customerid + "')" + '">Update Info</button></td><td>' + customerid + "</td><td>" + companyname + "</td><td>" + companycity + "</td></tr>"; //Creates a table row with button
            }
            display += "</table>"; //Closes the table HTML after table rows are added
            document.getElementById("customerlist").innerHTML = display; //Displays the table in the HTML page
        }
}

function Orders(customerid) //Retrieves a list of items ordered by a particular customer using the customer ID for the search
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/"; //Service URL
    url += customerid; //Customer ID to complete Service URL
    
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
              
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output); 
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    
    function GenerateOutput(result) //Function that displays results
    {
        var display = "<table><tr><th>Product Name</th><th>Total Ordered</th></tr>";
        var count = 0;
        for(count = 0; count < result.length; count ++)
        {
            display += "<tr><td>" + result[count].ProductName + "</td><td>" + result[count].Total + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("orderhistory").innerHTML = display;
        MenuChoice("Section 2");
    }
}

function CustomerList()
{
    MenuChoice("Section 1");
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

//GOOD UP TO HERE!!!!!!!!!!!!!!!!!!

//option 1
function StoreInfo(customerid)

//option 2
{
   var xmlhttp = new XMLHttpRequest();
       var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getOrdersForCustomer/";
       url += customerid;
      
       xmlhttp.onreadystatechange=function()
      {
           if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
           {
               var output = JSON.parse(xmlhttp.responseText);
               document.getElementById("orderID").value = output[0].OrderID;
               document.getElementById("customername").value = output[0].ShipName;
               document.getElementById("customeraddress").value = output[0].ShipAddress;
               document.getElementById("customercity").value = output[0].ShipCity;
               document.getElementById("customerpostcode").value = output[0].ShipPostCode;
               MenuChoice("Section 3");
               
           }
       }
}


function StoreUpdate()
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var result = JSON.parse(xmlhttp.responseText);
            var outcome = result.WasSuccessful;
    var error = result.Exception;
    OperationResult(outcome, error); //Calls the funciton that displays the result in an alert message
    MenuChoice("Section 1"); //Calls the menu choice function to display the store list
        }
    }
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress";
    var orderid = Number(document.getElementById("orderID").value);
    var shipname = document.getElementById("customername").value;
    var shipaddress = document.getElementById("customeraddress").value;
    var shipcity = document.getElementById("customercity").value;
    var shipcode = document.getElementById("customerpostcode").value;

    var parameters = '{"OrderID":' + orderid + ',"ShipName":"' + shipname + '","ShipAddress":"' + shipaddress + '","ShipCity":"' + shipcity + '","ShipPostCode":"' + shipcode +'"}'; //Creates the JSON string to be sent for the update operation

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(parameters);
}

//Function that displays the result of an operation that adds, deletes, or updates data
//The function is invoked from other functions
function OperationResult(success, exception)
{
    switch (success)
    {
        case 1:
            alert("The operation was successful");
            break;
        case 0:
            alert("The operation was not successful:\ "+ exception);
            break;
        case -2:
            alert("The operation was not successful because the data string supplied could not be deserialized into the service object.");
            break;
        case -3:
            alert("The operation was not successful because a record with the supplied ID could not be found");
            break;
        default:
            alert("The operation code returned is not identifiable.");
    }
}