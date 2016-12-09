<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:date="http://exslt.org/dates-and-times" version="2.0" extension-element-prefixes="date">
	<xsl:template name="announcement">
		<!--  Creating Dates	  -->
		<xsl:variable name="Start_Day">
			<xsl:choose>
				<xsl:when test="/Properties/Data/Group[@ID='Start']/Datum[@ID='Start_Date']/Date/@Day &lt; 10">
					<xsl:value-of select="concat(0,/Properties/Data/Group[@ID='Start']/Datum[@ID='Start_Date']/Date/@Day)"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="/Properties/Data/Group[@ID='Start']/Datum[@ID='Start_Date']/Date/@Day"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:variable name="Start_Month">
			<xsl:choose>
				<xsl:when test="/Properties/Data/Group[@ID='Start']/Datum[@ID='Start_Date']/Date/@Month &lt; 10">
					<xsl:value-of select="concat(0,/Properties/Data/Group[@ID='Start']/Datum[@ID='Start_Date']/Date/@Month)"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="/Properties/Data/Group[@ID='Start']/Datum[@ID='Start_Date']/Date/@Month"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:variable name="Start_Date">
			<xsl:value-of select="concat(/Properties/Data/Group[@ID='Start']/Datum[@ID='Start_Date']/Date/@Year,'-',$Start_Month,'-',$Start_Day)"/>
		</xsl:variable>

		<xsl:variable name="End_Day">
			<xsl:choose>
				<xsl:when test="/Properties/Data/Group[@ID='End']/Datum[@ID='End_Date']/Date/@Day &lt; 10">
					<xsl:value-of select="concat(0,/Properties/Data/Group[@ID='End']/Datum[@ID='End_Date']/Date/@Day)"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="/Properties/Data/Group[@ID='End']/Datum[@ID='End_Date']/Date/@Day"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:variable name="End_Month">
			<xsl:choose>
				<xsl:when test="/Properties/Data/Group[@ID='End']/Datum[@ID='End_Date']/Date/@Month &lt; 10">
					<xsl:value-of select="concat(0,/Properties/Data/Group[@ID='End']/Datum[@ID='End_Date']/Date/@Month)"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="/Properties/Data/Group[@ID='End']/Datum[@ID='End_Date']/Date/@Month"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>

		<xsl:variable name="End_Date">
			<xsl:value-of select="concat(/Properties/Data/Group[@ID='End']/Datum[@ID='End_Date']/Date/@Year,'-',$End_Month,'-',$End_Day)"/>
		</xsl:variable>

		<xsl:variable name="This_Date" select="current-dateTime()"/>
		<!--  Date format conversion	 -->
		<xsl:variable name="Sdate" select="format-date($Start_Date, '[Y0001]-[M01]-[D01]')"/>
		<xsl:variable name="SdateTime" select="concat($Sdate,'T',/Properties/Data/Group[@ID='Start']/Datum[@ID='S_Hour']/Option[@Selected='true']/Value,':',/Properties/Data/Group[@ID='Start']/Datum[@ID='S_Minutes']/Option[@Selected='true']/Value,':00')"/>

		<xsl:variable name="Edate" select="format-date($End_Date, '[Y0001]-[M01]-[D01]')"/>
		<xsl:variable name="EdateTime" select="concat($Edate,'T',/Properties/Data/Group[@ID='End']/Datum[@ID='E_Hour']/Option[@Selected='true']/Value,':',/Properties/Data/Group[@ID='End']/Datum[@ID='E_Minutes']/Option[@Selected='true']/Value,':00')"/>
		<xsl:variable name="Tdate" select="substring(string($This_Date),0,20)"/>
		<xsl:variable name="time-diff-sec-now" select="date:seconds(date:difference($SdateTime, $Tdate))"/>
		<xsl:variable name="time-diff-sec-set" select="date:seconds(date:difference($SdateTime, $EdateTime))"/>
		<!--  Div Start here	  -->
		<div class="container" id="announcement">
			<div class="row">
				<!--  Check Dates  -->
				<xsl:if test="$time-diff-sec-now &lt;= $time-diff-sec-set">
					<div role="alert" class="alert {/Properties/Data/Datum[@ID='Color_Theme']/Option[@Selected='true']/Value}">
						<span class="fa fa-info-circle"/>
						<span>
							<!-- <xsl:choose>
								<xsl:when test="/Properties/Data/Datum[@ID='Link'] != ''">
									<a>
										<xsl:attribute name="href">
											<xsl:value-of select="/Properties/Data/Datum[@ID='Link']"/>
										</xsl:attribute>
										<xsl:value-of select="/Properties/Data/Datum[@ID='Announcement']"/>
									</a>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="/Properties/Data/Datum[@ID='Announcement']" disable-output-escaping="yes" />
								</xsl:otherwise>
							</xsl:choose> -->
							<xsl:value-of select="/Properties/Data/Datum[@ID='Announcement']" disable-output-escaping="yes" />
						</span>
						<button type="button" data-dismiss="alert" aria-label="Close" class="close">
							<span aria-hidden="true">x</span>
						</button>
					</div>
				</xsl:if>
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>