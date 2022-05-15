package com.PAF;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/**
 * Servlet implementation class ItemsAPI
 */
@WebServlet("/BillAPI")
public class BillAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
 
    public BillAPI() {
        super();
        // TODO Auto-generated constructor stub
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		System.out.println("inside do Post method to insert");
		Bill billObj= new Bill();
		
		String output = billObj.InsertBill(request.getParameter("AccNo"),
				request.getParameter("lastMeterReadingsCurrentMonth"),
				request.getParameter("lastMeterReadingsPreviousMonth"),
				request.getParameter("year"),
				request.getParameter("month"));
				response.getWriter().write(output);
		
		// TODO Auto-generated method stub
		doGet(request, response);
	}

	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Bill billObj= new Bill();
		
		Map paras = getParasMap(request);
		String output = billObj.updateBillDetails(paras.get("hidItemIDSave").toString(),
		paras.get("AccNo").toString(),
		paras.get("lastMeterReadingsPreviousMonth").toString(),
		paras.get("lastMeterReadingsCurrentMonth").toString(),
		paras.get("year").toString(),
		paras.get("month").toString());
		response.getWriter().write(output);
	}

	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Bill billObj= new Bill();
		
		Map paras = getParasMap(request);
		System.out.println(paras.get("billID").toString());
		String output = billObj.deleteBill(paras.get("billID").toString());
		response.getWriter().write(output);
		
	}
	
	//custom method to read the request parameters for doPut() and doDelete()
	// Convert request parameters to a Map
	private static Map getParasMap(HttpServletRequest request)
	{
		Map<String, String> map = new HashMap<String, String>();
		try
		{
		Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
		String queryString = scanner.hasNext() ?
		scanner.useDelimiter("\\A").next() : "";
		scanner.close();
		String[] params = queryString.split("&");
		for (String param : params)
		{
			String[] p = param.split("=");
			map.put(p[0], p[1]);
		}
	}
	catch (Exception e)
	{
	}
	return map;
	}
}
