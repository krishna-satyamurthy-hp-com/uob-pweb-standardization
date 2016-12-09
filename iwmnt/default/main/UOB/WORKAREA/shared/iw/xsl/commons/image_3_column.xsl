<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template name="image_3_column">
		<div class="container">
			<div class="row sticky-wrapper">
				<section class="more-than-just-cards-block pusher-b-30"> 
					<xsl:apply-templates select="/Properties/Data/Datum[@ID='image-3-column']/DCR[@Type='3-column-image']/root"/>
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
	    <div class="container">
			<xsl:call-template name="image_details"/>	
		</div>
	</xsl:template>	
	
	<xsl:template name="image_details">
		<xsl:for-each select="img_3_colum">
			<div class="row">
			  <xsl:for-each select="img_tile_detail">
				<div class="col-md-4 col-sm-4 col-xs-6 image-item-wrap">
				  <a>
					<xsl:attribute name="title">
					  <xsl:value-of select="content_title"/>
					</xsl:attribute>
					<xsl:attribute name="href">
					  <xsl:value-of select="img_link"/>
					</xsl:attribute>
					<xsl:if test="img!=''">
						<div class="img-wrapper">
						  <img class="img-responsive">
							<xsl:attribute name="src">
							  <xsl:value-of select="img"/>
							</xsl:attribute>
							<xsl:attribute name="data-uob-src-mobile">
							  <xsl:value-of select="mobile_img"/>
							</xsl:attribute>
							<xsl:attribute name="alt">
							  <xsl:value-of select="img_alt"/>
							</xsl:attribute>
						  </img>
						</div>
						<xsl:if test="content_title != ''">
							<div class="content-text">
							  <span>
								  <xsl:value-of select="content_title"/>
							  </span>
							  <xsl:if test="short_desc != '' " >
								  <p>
								  	<xsl:value-of select="short_desc" />
								  </p>
								</xsl:if>
							</div>
						</xsl:if>
					</xsl:if>
				  </a>
				</div>
			  </xsl:for-each>          
			</div>
		</xsl:for-each>  
	</xsl:template>

</xsl:stylesheet>