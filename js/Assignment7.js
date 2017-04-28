function MenuChoice(selection)
{
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "none";
    document.getElementById("section3").style.display = "none";
    document.getElementById("section4").style.display = "none";
    document.getElementById("section6").style.display = "none";
    document.getElementById("section7").style.display = "none";
    document.getElementById("section8").style.display = "none";
    document.getElementById("section9").style.display = "none";
    document.getElementById("section10").style.display = "none";
    document.getElementById("section11").style.display = "none";
    document.getElementById("section5").style.display = "none";
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
            document.getElementById("section4").style.display = "block";
            break;
        case "Section 6":
            document.getElementById("section6").style.display = "block";
            break;
        case "Section 7":
            document.getElementById("section7").style.display = "block";
            break;
        case "Section 8":
            document.getElementById("section8").style.display = "block";
            break;
        case "Section 9":
            document.getElementById("section9").style.display = "block";
            break;
        case "Section 10":
            document.getElementById("section10").style.display = "block";
            break;
        case "Section 11":
            document.getElementById("section11").style.display = "block";
            break;
        case "Section 5":
            document.getElementById("section5").style.display = "block";  //makes the section (about) visable
            break;
        case "None":            //No menu item selected, so no section should be displayed
            break;
        default:
            alert("Please select a menu option");
    }
}


{//Taking a picture and sharing it on the SocialShare app
    
    //Function that invokes device camera app and captures output from the camera app
    function CapturePic()
    {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 20, destinationtype: destinationtype.FILE_URI, saveToPhotoAlbum: true });
        //The onSuccess parameter is the function that is called when the camera app operates successfully
        //The onFail parameter is the function that is called when no picture is returned
        //The other parameters indicate how the picture is to be handled
    }
    function onSuccess(imageURI)
    {
        var thumbnaildisplay = document.getElementById("thumbnail");
        thumbnaildisplay.style.visibility = "visible";
        thumbnaildisplay.style.display = "block";
        thumbnaildisplay.src = imageURI; //Assigns the picture to the image source property of the image on the web page
    }
        //SocialShare app
    function socialshare()
    {
        window.plugins.socialsharing.available(function(isAvailable)
        {
            if (isAvailable)
            {
             // use a local image from inside the www folder:
        //      window.plugins.socialsharing.share('Some text', 'Some subject', null, 'http://www.nu.nl');
        //      window.plugins.socialsharing.share('Some text');

        //      window.plugins.socialsharing.share('test', null, 'data:image/png;base64,R0lGODlhDAAMALMBAP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUKAAEALAAAAAAMAAwAQAQZMMhJK7iY4p3nlZ8XgmNlnibXdVqolmhcRQA7', null, function(e){alert("success: " + e)}, function(e){alert("error: " + e)});
                var sub = document.getElementById("subject").value;
                var mesg = document.getElementById("message").value;
                
                window.plugins.socialsharing.share(mesg, sub, copypic, null, function(){alert("all good!")}, function(e){alert("error: " + e)});
        // alternative usage:

        // 1) a local image from anywhere else (if permitted):
            // window.plugins.socialsharing.share('Some text', 'http://domain.com', '/Users/username/Library/Application Support/iPhone/6.1/Applications/25A1E7CF-079F-438D-823B-55C6F8CD2DC0/Documents/.nl.x-services.appname/pics/img.jpg');

         // 2) an image from the internet:
        //      window.plugins.socialsharing.share('Some text', "Some subject', 'http://domain.com', 'http://domain.com/image.jpg');

        // 3) text and link:
        //      window.plugins.socialsharing.share('Some text and a link', '', '', 'http://www.nu.nl');
            }
        });
    }
}

//Function that checks the network connection and displays an alert
function checkConnection()
{
    var networkState = navigator.connection.type;
 
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
 
    alert('Connection type: ' + states[networkState]);
}
 
checkConnection();


//Function that invokes device camera app and captures output from the camera app
function CapturePhoto()
{
    navigator.camera.getPicture(onSuccess, onFail, { quality: 20, destinationtype: destinationtype.FILE_URI, saveToPhotoAlbum: true });
    //The onSuccess parameter is the function that is called when the camera app operates successfully
    //The onFail parameter is the function that is called when no picture is returned
    //The other parameters indicate how the picture is to be handled
}
//This function handles the picture returned from the CapturePhoto function and displays it on the web page
function onSuccess(imageURI)
{
    var picdisplay = document.getElementById("snapshot");
    picdisplay.style.visibility = "visible";
    picdisplay.style.display = "block";
    picdisplay.src = imageURI; //Assigns the picture to the image source property of the image on the web page
}
//This function displays an error message if a picture is not returned
function onFail(message)
{
    alert("Failed because: " + message);
}

//This function displays the contact list on the device and collects the data for the contact selected
function PickContact()
{
    //The pickcontact method has two parameters.  The first parameter is the function that handles a successful contact
    //selection, and the data is returned.  The second parameter is optional, and is called if no contact is returned.
    //The contact information is returned as a JSON object, with arrays for certain items like phone numbers.
    navigator.contacts.pickContact(function(contact) //Function that operates when a contact is successfully returned
    {
        var contactinfo = "";
        contactinfo += contact.name.givenName + " " + contact.name.familyName + "<br>";
        var count = 0;
        
        if (contact.phoneNumbers !== null) //Checks for the presence of phone numbers
        {
            for (count=0; count < contact.phoneNumbers.length; count++) //Retrieves all the phone numbers
            {
                contactinfo += contact.phoneNumbers[count].type + ": " + contact.phoneNumbers[count].value + "<br>";
            }
        }
        if (contact.emails !== null) //Checks for the presence of email addresses
        {
            for(count=0; count < contact.emails.length; count++) //Retrieves all email addresses
            {
                contactinfo += contact.emails[count].type + ": " + contact.emails[count].value + "<br>";
            }
        }
        document.getElementById("contactname").innerHTML = contactinfo;
    }, function(err) //Function that operates when nothing is returned
    {
        alert("Error: " + err);
    }
    );
}

//function to search for contact
function SearchContacts()
{
    {
    
        var options = new ContactFindOptions();
        options.filter = document.getElementById("lastname").value;
        options.multiple = true;
        options.desiredFields = [navigator.contacts.fieldType.id];
        var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        navigator.contacts.find(fields, onSuccess, onError, options);
    }

    function onSuccess(contacts)
    {
        alert('Found ' + contacts.length + ' contacts with that name.');
    };

    function onError(contactError)
    {
        alert('onError!');
    };
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
            var display = "<table><tr><th>Update</th><th>Customer ID</th><th>Company Name</th><th>Company City</th><th>Delete</th></tr>"; //Table Headings
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
                  display += '<tr><td><button onclick="StoreInfo(' + "'" + customerid + "')" + '">Update Info</button></td><td>' + customerid + "</td><td>" + companyname + "</td><td>" + companycity + '<td><button onclick="DeleteCustomer(' + "'" + customerid + "')" + '">Delete</button></td></tr>';
                  
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
            alert(JSON.stringify(xmlhttp.result));
              
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output); 
        }
        else
        {
            alert("error");
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

//GOOD UP TO HERE!!!!!!!!!!!!!!!!!!PROBLEM AREA BELOW!!!!!!!!!!

function StoreInfo(customerid)
{
    var xmlhttp = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/GetCustomerOrderInfo/" + customerid;
    //url += customerid;

    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            
            document.getElementById("orderID").value = result.GetCustomerOrderInfo[0].OrderID;
            document.getElementById("storeaddress").value = result.GetCustomerOrderInfo[0].ShipAddress;
            document.getElementById("storecity").value = result.GetCustomerOrderInfo[0].ShipCity;
            document.getElementById("storename").value = result.GetCustomerOrderInfo[0].ShipName;
            document.getElementById("storepostcode").value = result.GetCustomerOrderInfo[0].ShipPostcode;
            
            MenuChoice("Section 3");
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function DeleteCustomer(customerid)
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/DeleteCustomer/";
    url += customerid;

    //Checking for change event....Checking for AJAX operation return
    objRequest.onreadystatechange = function()
    {
    if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            DeleteResult(result);
        }
    }
    
    //Start AJAX request
    objRequest.open("GET", url, true);
    objRequest.send();
    MenuChoice("Section 1");
}

//This function executes an update operation on the Store Name and Store City
function CustomerUpdate()
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
        } else
        {
            alert("error");
        }
    };
        var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/UpdateOrderAddress";
        var orderid = Number(document.getElementById("orderID").value);
        var shipaddress = document.getElementById("storeaddress").value;
        var shipcity = document.getElementById("storecity").value;
        var shipname = document.getElementById("storename").value;
        var shippostcode = document.getElementById("storepostcode").value;
        
    
        var parameters = '{"OrderID":' + orderid + ',"ShipAddress":"' + shipaddress + '","ShipCity":"' + shipcity + '","ShipName":"' + shipname + '","ShipPostCode":"' + shippostcode + '"}'; //Creates the JSON string to be sent for the update operation

        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(parameters);
}



//GOOD AFTER HERE...........THIS SEEMS TO WORK!!!!!!
//Function to retrieve a particular order

function GetOrder()
{
    var objRequest = new XMLHttpRequest();  //Creates the AJAX request object
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderInfo/";
        //Creates a variable for the long URL. The "/" at the end leaves a space for the user input (to retrieve their querry)
    url += document.getElementById("orID").value;
        //Tacks on the end of the URL what the customer is looking for (here a company ID retrieved from the input field in HTML)
    
        //Checks for a response and the server status, then parses the data with object
        
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            document.getElementById("odate").value = output[0].OrderDate;
            document.getElementById("oID").value = output[0].OrderID;
            document.getElementById("streetaddress").value = output[0].ShipAddress;
            document.getElementById("city").value = output[0].ShipCity;
            document.getElementById("name").value = output[0].ShipName;
            document.getElementById("zipcode").value = output[0].ShipPostcode;
            document.getElementById("sdate").value = output[0].ShippedDate;
        } else
        {
            alert('Server Error');
        }
    }
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

//  Create Customer 

function CreateCustomer()
{
    var objRequest =new XMLHttpRequest ();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    //collect client input from the webpage
    var create_Id = document.getElementById("createId").value;
    var create_Name = document.getElementById("createName").value;
    var create_City = document.getElementById("createCity").value;
    
    //create the parameter string (how it must be formatted)
    var storenew = '{"CustomerID":"'+ create_Id +'","CompanyName":"'+create_Name +'","City":"'+ create_City +'"}';
    
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
            
        }
    }
     //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(storenew);
    MenuChoice("Section 1")
}

function OperationResult(output)
{
    if (output.WasSuccessful ==1)
    {
        document.getElementById("result").innerHTML = "Store successfully added!";
    }
    else
    {
        document.getElementById("result").innerHTML = "The operation was NOT successful!" + "<br>" + output.Exception;
    }
}
    
    


//Code for update customer prevents the rest of the app from working, so code is in a seperate file

//Code for section 7, Geolocation, below:

function Location() //Calls the Geolocation function built in to the web browser
{
    var geo = navigator.geolocation;  //References the Web Browser (navigator) geolocation service
    
    if (geo) //Tests to see of geolocation service is available
    {
        geo.getCurrentPosition(showPosition); //If the geolocation service is available it gets the position and calls a function to display it
         
    }
    else
    {
        alert("Geolocation is not supported"); //If the Geolocation service is not available it displays a message  
    }
} 
function showPosition(position) //Function receives the geolocation data and displays it
{
    var latitude = position.coords.latitude; //Retrieves latitude data
    var longitude = position.coords.longitude; //Retrieves longitude data
    document.getElementById("latitude").innerHTML = latitude;
    document.getElementById("longitude").innerHTML = longitude;
}
// Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.6872, lng: -97.3301},
          zoom: 4
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
        
      }
        