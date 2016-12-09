<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="apply_now_fixed_bottom">
    <xsl:if test="/Properties/Data/Datum[@ID='D01']/Option[@Selected='true']/Value != ''">
  		<div class="container">
  			<div class="apply-now-fixed bottom">
  				<div class="wrap-content">
  					<p><xsl:value-of select="/Properties/Data/Datum[@ID='announcementText']"/></p>
						<xsl:if test="/Properties/Data/Datum[@ID='ctaText'] != ''">
	  					<a class="btn-1">
	  						<xsl:attribute name="href">
	  							<xsl:value-of select="/Properties/Data/Datum[@ID='ctaLink']" />
	  						</xsl:attribute>
	  						<xsl:attribute name="title">
	  							<xsl:value-of select="/Properties/Data/Datum[@ID='ctaText']" />
	  						</xsl:attribute>
	  						<!-- <xsl:attribute name="class">
	  							<xsl:text>btn-1</xsl:text>
	  						</xsl:attribute> -->
	  						<xsl:value-of select="/Properties/Data/Datum[@ID='ctaText']" />
	  					</a>
						</xsl:if>
  				</div><span class="arrow-expand open"></span>
  			</div>
  		</div>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>
