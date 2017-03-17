function MenuChoice(selection)
{
    document.getElementById("section1").style.display = "none";
    document.getElementById("section2").style.display = "none";
    switch (selection)
    {
        case "Section 1":
        document.getElementById("section1").style.display = "block";
        break;
        case "Section 2":
        document.getElementById("section2").style.display = "block";
        break;
        case "None":            //No menu item selected, so no section should be displayed
        break;
        default:
            alert("Please select a different menu option");
    }
}


