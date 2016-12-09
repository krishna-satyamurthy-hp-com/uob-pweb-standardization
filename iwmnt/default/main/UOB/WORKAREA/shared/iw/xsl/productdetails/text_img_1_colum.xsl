<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="text_img_1_colum">
		 <div class="section-content">
			<div class="grid-items">
              <div class="grid-thumbnail">
				<img>
					<xsl:attribute name="src">
						<xsl:value-of select="img"/>
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="img_alt"/>
					</xsl:attribute>
					<xsl:if test="img_mobile !=''">
						<xsl:attribute name="data-uob-src-mobile">
							<xsl:value-of select="img_mobile"/>
						</xsl:attribute>
					</xsl:if>
				</img>
			  </div>
			  
              <div class="grid-desc">
                <h3 class="heading3"><xsl:value-of select="content_headline"/></h3>
                <xsl:value-of select="content_body" disable-output-escaping="yes"/>
              </div>
            </div>
		 </div>
		</xsl:template>
</xsl:stylesheet>