package com.opentext.ls.core.servlet;

import com.opentext.ls.db.utils.DBConnectionManager;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

//import javax.servlet.annotation.WebServlet;

//import com.opentext.ls.db.utils.DataSourceConfig;

//import com.opentext.ls.db.ConProvider;

/**
 * Servlet implementation class PromoListingServlet
 */
// @WebServlet("/wsm/getpromotions.do")
public class PromoListingServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final transient Log LOGGER = LogFactory
			.getLog(PromoListingServlet.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PromoListingServlet() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		LOGGER.debug("Inside PromoListingServlet : doGet");
		doPost(request, response);
	}

	/**
	 * This servlet fetches the non-api promotions from DB and sends a json
	 * response
	 * 
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 * @author OpenText CEM PS APJ @
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		LOGGER.debug("Inside PromoListingServlet : doPost");
		final String env = request.getParameter("env");
		LOGGER.debug("Env is "+env);
		final String countryCode = request.getParameter("countryCode");
		final String promoSiteName = request.getParameter("promoSiteName");
		String promoCategory = request.getParameter("promoCategory");
		if (promoCategory == null || promoCategory.trim().isEmpty()){
			promoCategory = "";
		}
		String promoCountry = request.getParameter("promoCountry");
		if (promoCountry == null || promoCountry.trim().isEmpty()){
			promoCountry = "";
		}
		LOGGER.debug("Promo Category is "+promoCategory);
		LOGGER.debug("Promo SiteName is "+promoSiteName);
		LOGGER.debug("Promo Country is "+promoCountry);
		Connection con = null;
		JSONArray jArray = new JSONArray();
		JSONObject promoListJSON = new JSONObject();

		try {
			DBConnectionManager dbConMan = new DBConnectionManager();
			if(env != null && !env.isEmpty() && env.equalsIgnoreCase("runtime")){
				LOGGER.debug("Servlet call for runtime ");
				//con = dbConMan.getRTDBConnection();
				con = dbConMan.getLocalRTDBConnection();
			}
			else{
				LOGGER.debug("Servlet call for authoring");
				con = dbConMan.getAuthDBConnection();
			}
			// Get runtime DB connection in UOB environment
			// con = dbConMan.getRTDBConnection();
			LOGGER.debug("Connection established successfully "
					+ !con.isClosed());
			Date today = new Date();
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String todayStr = df.format(today);
			LOGGER.debug("Today's date "+ todayStr);
			PreparedStatement ps;
			/*String selectPromoQuery = "SELECT * from twsm_pweb_promotionlist WHERE promocategoryname = '"+promoCategory+"' AND ((ACTIVATIONDATE <= TO_DATE('"
								+ todayStr
								+ "','YYYY-MM-DD') AND EXPIRYDATE > TO_DATE('"
								+ todayStr
								+ "','YYYY-MM-DD')) OR PROMOLIFE='Evergreen') ORDER BY PROMOTITLE";*/
			String selectPromoQuery ="SELECT * from twsm_pweb_promotionlist WHERE countrycode = '"+countryCode+"' AND sitename = '"+promoSiteName+"' AND promocountry like '%"+promoCountry+"%' AND promocategoryname like'%"+promoCategory+"%' AND ((ACTIVATIONDATE <= '"+ todayStr +"' AND EXPIRYDATE > '"+ todayStr +"') OR PROMOLIFE='Evergreen') ORDER BY PROMOTITLE";
			if(countryCode != null || !countryCode.trim().isEmpty() && promoSiteName == null || promoSiteName.trim().isEmpty()){
				selectPromoQuery ="SELECT * from twsm_pweb_promotionlist WHERE countrycode = '"+countryCode+"' AND promocountry like '%"+promoCountry+"%' AND promocategoryname like'%"+promoCategory+"%' AND ((ACTIVATIONDATE <= '"+ todayStr +"' AND EXPIRYDATE > '"+ todayStr +"') OR PROMOLIFE='Evergreen') ORDER BY PROMOTITLE";
			}
			if(countryCode == null || countryCode.trim().isEmpty() && promoSiteName != null || !promoSiteName.trim().isEmpty()){
				selectPromoQuery ="SELECT * from twsm_pweb_promotionlist WHERE sitename = '"+promoSiteName+"' AND promocountry like '%"+promoCountry+"%' AND promocategoryname like'%"+promoCategory+"%' AND ((ACTIVATIONDATE <= '"+ todayStr +"' AND EXPIRYDATE > '"+ todayStr +"') OR PROMOLIFE='Evergreen') ORDER BY PROMOTITLE";
			}
			if(countryCode == null || countryCode.trim().isEmpty() && promoSiteName == null || promoSiteName.trim().isEmpty()){
				selectPromoQuery ="SELECT * from twsm_pweb_promotionlist WHERE promocountry like '%"+promoCountry+"%' AND promocategoryname like'%"+promoCategory+"%' AND ((ACTIVATIONDATE <= '"+ todayStr +"' AND EXPIRYDATE > '"+ todayStr +"') OR PROMOLIFE='Evergreen') ORDER BY PROMOTITLE";
			}
			
			LOGGER.debug("selectPromoQuery "+ selectPromoQuery);
			ps = con.prepareStatement(selectPromoQuery);
			ResultSet rs = ps.executeQuery();

			ResultSetMetaData rsmd = rs.getMetaData();
			int columnCount = rsmd.getColumnCount();
			LOGGER.debug("Total column count " + columnCount);
			JSONObject jObj = null;
			String columnName;
			while (rs.next()) {
				jObj = new JSONObject();
				for (int i = 1; i <= columnCount; i++) {
					columnName = rsmd.getColumnName(i);
					jObj.put(columnName, rs.getString(columnName));
				}
				jArray.put(jObj);
			}
			promoListJSON.put("promo_details", jArray);
			LOGGER.debug("Json object " + promoListJSON);
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();
			out.print(promoListJSON);
			out.flush();
		} catch (SQLException s) {
			s.printStackTrace();
			LOGGER.error("SQL Exception caught in  PromoListingServlet class "
					+ s.getMessage());
		} catch (Exception ex) {
			LOGGER.error("Exception caught in  PromoListingServlet class "
					+ ex.getCause());
			ex.printStackTrace();
		} finally {
			try {
				if (con != null && !con.isClosed()) {
					System.out
							.println("Inside PromoListingServlet finally block");
					LOGGER.debug("Inside PromoListingServlet finally block");
					con.close();
					System.out.println("Is connection closed successfully "
							+ con.isClosed());
				}
			} catch (SQLException s) {
				LOGGER.error("SQL Exception caught in finally block of PromoListingServlet class "
						+ s.getMessage());
				s.printStackTrace();
			} catch (Exception ex) {
				LOGGER.error("Exception caught in finally block of PromoListingServlet class "
						+ ex.getMessage());
				ex.printStackTrace();
			}
		}
	}
}
