<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" >

	<xsl:template name="free_text_1_column">
	<!--	<xsl:for-each select=".">
			<div>
				<xsl:value-of select="desc" disable-output-escaping="yes"/>
			</div>
		</xsl:for-each> -->
		
		 <div class="section-content">
            <div class="content-block">
				<div class="free-text">
					<xsl:value-of select="desc" disable-output-escaping="yes"/>
				</div>
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>