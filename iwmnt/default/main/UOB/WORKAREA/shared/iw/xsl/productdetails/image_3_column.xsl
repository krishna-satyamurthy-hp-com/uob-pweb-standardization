<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	
	<xsl:template name="image_3_column">
		<div class="section-content">
		<xsl:for-each select="content">
            <div class="image-items-wrap">
				<xsl:for-each select="img_tile_detail">
				<div class="image-item-wrap">
				  <a>
					<xsl:attribute name="title">
					  <xsl:value-of select="content_title"/>
					</xsl:attribute>
					<xsl:attribute name="href">
					  <xsl:value-of select="img_link"/>
					</xsl:attribute>
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
						</div>
					</xsl:if>
				  </a>
				</div>
			  </xsl:for-each>  
			</div>
			</xsl:for-each>
		</div>
	</xsl:template>
</xsl:stylesheet>