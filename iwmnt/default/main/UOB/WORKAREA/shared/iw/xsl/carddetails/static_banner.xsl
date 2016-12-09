<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="static_banner">
		<div class="section-content">
            <div class="float-banner">
              <div class="light-banner">
			  <img class="img-responsive">
					<xsl:attribute name="src">
						<xsl:value-of select="img"/>
					</xsl:attribute>
					<xsl:attribute name="alt">
						<xsl:value-of select="img_alt"/>
					</xsl:attribute>
				</img>
               <div class="description">
                <h2 class="heading2">
					<xsl:if test="img_headline != ''"><xsl:value-of select="img_headline"/></xsl:if>
				</h2>
                <p>
					<xsl:if test="img_sub_heading != ''"><xsl:value-of select="img_sub_heading"/></xsl:if>
				</p>
				<xsl:if test="cta_label != ''">
					<p class="pusher-t-15">
						<a class="btn-1">
							<xsl:attribute name="href"><xsl:value-of select="cta_link"/></xsl:attribute>
							<xsl:attribute name="title"><xsl:value-of select="cta_label"/></xsl:attribute>
							<xsl:value-of select="cta_label"/>
						</a>
					</p>
				</xsl:if>
              </div>
              </div>
            </div>
          </div>
	</xsl:template>
</xsl:stylesheet>