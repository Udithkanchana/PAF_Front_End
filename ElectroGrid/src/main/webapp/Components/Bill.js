$(document).ready(function()
{
if ($("#alertSuccess").text().trim() == "")
{
$("#alertSuccess").hide();
}
$("#alertError").hide();
});


//Save button function
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateItemForm();
	if (status != true)
	{
	$("#alertError").text(status);
	$("#alertError").show();
	return;
	}
	// If valid-------------------------
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";

	$.ajax(
	{
		url : "ItemsAPI",
		type : type,
		data : $("#formItem").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onItemSaveComplete(response.responseText, status);
		}
	});
	
	
});




// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
$("#hidItemIDSave").val($(this).data("billID"));
$("#AccNo").val($(this).closest("tr").find('td:eq(0)').text());
$("#lastMeterReadingsPreviousMonth").val($(this).closest("tr").find('td:eq(3)').text());
$("#lastMeterReadingsCurrentMonth").val($(this).closest("tr").find('td:eq(2)').text());
$("#year").val($(this).closest("tr").find('td:eq(5)').text());
$("#month").val($(this).closest("tr").find('td:eq(6)').text());
});

//DELETE ===============================================

$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
		url : "ItemsAPI",
		type : "DELETE",
		data : "itemID=" + $(this).data("billID"),
		dataType : "text",
		complete : function(response, status)
	{
		onItemDeleteComplete(response.responseText, status);
	}
	});
});

// CLIENT-MODEL================================================================
function validateItemForm()
{
	// CODE
	if ($("#AccNo").val().trim() == "")
	{
		return "Insert AccNo.";
	}
	// NAME
	if ($("#lastMeterReadingsPreviousMonth").val().trim() == "")
	{
		return "Insert previous Meter reading.";
	}
	// PRICE-------------------------------
	if ($("#lastMeterReadingsCurrentMonth").val().trim() == "")
	{
		return "Insert Current Meter reading.";
	}
	// YEAR-------------------------------
	if ($("#year").val().trim() == "")
	{
		return "Insert year.";
	}
	if ($("#month").val().trim() == "")
	{
		return "Insert month.";
	}
	
	// is numerical value
	var tmpPreviousMeter = $("#lastMeterReadingsPreviousMonth").val().trim();
	if (!$.isNumeric(tmpPreviousMeter))
	{
		return "Insert a numerical value.";
	}
	var tmpCurrentMeter = $("#lastMeterReadingsCurrentMonth").val().trim();
	if (!$.isNumeric(tmpCurrentMeter))
	{
		return "Insert a numerical value.";
	}
	
	return true;
}


function onItemSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	
	$("#hidItemIDSave").val("");
	$("#formItem")[0].reset();
}