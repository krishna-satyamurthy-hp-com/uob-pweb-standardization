<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" >

	<xsl:template name="menu_3_column">
		<div class="container">
			<div class="row sticky-wrapper">
				<section class="more-info-block pusher-b-30"> 
					<xsl:apply-templates select="/Properties/Data/Datum[@ID='menu-3-column']/DCR[@Type='3-column-menu']/root"/>
				</section>
			</div>
		</div>
	</xsl:template>

	
	<xsl:template match="root">
		<xsl:choose>
			<xsl:when test="title != '' and subtitle != ''">
				<h2 class="heading2 subtitle"><xsl:value-of select="title" /></h2>
				<span><xsl:value-of select="subtitle" /></span>
			</xsl:when>
			<xsl:when test="title != '' and subtitle = ''">
				<h2 class="heading2"><xsl:value-of select="title" /></h2>
			</xsl:when>
			<xsl:otherwise>
			</xsl:otherwise>
		</xsl:choose>
	    <div class="container outer">
			<xsl:call-template name="menu_details"/>	
		</div>
	</xsl:template>	
	
	
	<xsl:template name="menu_details">
	
		<xsl:for-each select="menu_3_column">
			<xsl:if test="position() != 1">
				<span class="divider hidden-xs"></span>
			</xsl:if>
			<div class="row">
			<xsl:for-each select="menu_detail">
			  <div class="col-md-4 col-sm-4 col-sx-12">
				
			  <xsl:if test="menu_link != ''">
				  <a>
					<xsl:attribute name="href">
						<xsl:value-of select="menu_link"/>
					</xsl:attribute>
					<xsl:attribute name="title">
						<xsl:value-of select="menu_title"/>
					</xsl:attribute>
					<xsl:value-of select="menu_title"/>
					<xsl:text>&#160;</xsl:text>
				  </a>
				 </xsl:if>
				 <xsl:if test="menu_textarea != ''">
					<xsl:value-of select="menu_textarea" disable-output-escaping="yes"/>
				</xsl:if>
			  </div>
			  </xsl:for-each>
			</div>
		</xsl:for-each>

	</xsl:template>
</xsl:stylesheet>