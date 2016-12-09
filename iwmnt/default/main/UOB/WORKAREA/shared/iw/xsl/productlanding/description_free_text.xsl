<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" >

	<xsl:template name="description_free_text">
		<xsl:for-each select=".">
			<div>
				<xsl:value-of select="desc" disable-output-escaping="yes"/>
			</div>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>