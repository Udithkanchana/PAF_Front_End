<%@page import="com.PAF.Bill"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Bill Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.6.0.min.js"></script>
<script src="Components/BillScript.js"></script>
</head>
<body>
<div class="container"><div class="row"><div class="col-6">
<h1>Bill Management</h1>
	<form id="formItem" name="formItem">
	AccNo:
	<input id="AccNo" name="AccNo" type="text"
	class="form-control form-control-sm">
	<br> Current Meter Reading:
	<input id="lastMeterReadingsCurrentMonth" name="lastMeterReadingsCurrentMonth" type="text"
	class="form-control form-control-sm">
	<br> Previous Meter Reading:
	<input id="lastMeterReadingsPreviousMonth" name="lastMeterReadingsPreviousMonth" type="text"
	class="form-control form-control-sm">
	<br> Year:
	<input id="year" name="year" type="text"
	class="form-control form-control-sm">
	<br>Month:
	<input id="month" name="month" type="text"
	class="form-control form-control-sm">
	<br>
	
	<input id="btnSave" name="btnSave" type="button" value="Save"
	class="btn btn-primary">
	<input type="hidden" id="hidItemIDSave"
	name="hidItemIDSave" value="">
	</form>
	
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divItemsGrid">
<%
	Bill billObject = new Bill();
	out.print(billObject.getBillDetails());
%>
</div>
</div> </div> </div>
</body>
</html>