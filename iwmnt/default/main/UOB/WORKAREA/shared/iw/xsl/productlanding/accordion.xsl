<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="accordion">

		<xsl:param name="title"/>
		<xsl:variable name="unique-id"><xsl:value-of select="generate-id(.)" /></xsl:variable>
<xsl:for-each select=".">
		<div id="accordion" class="panel-group">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h6 class="panel-title">
						<a>
							<xsl:attribute name="href">
								<xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()" />
							</xsl:attribute>
							<xsl:attribute name="title">
								<xsl:value-of select="./accordion_title"/>
							</xsl:attribute>
							<xsl:attribute name="data-toggle">
								<xsl:text>collapse</xsl:text>
							</xsl:attribute>
							<xsl:attribute name="data-parent">
								<xsl:text>#accordion</xsl:text>
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>accordion-toggle collapsed</xsl:text>
							</xsl:attribute>							
							<xsl:value-of select="./accordion_title"/>
						</a>
					</h6>
				</div>
				<div>
					<xsl:attribute name="id">
						<xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()" />
					</xsl:attribute>
					<xsl:attribute name="class">
						<xsl:text>panel-collapse collapse</xsl:text>
					</xsl:attribute>
					<xsl:attribute name="style">
						<xsl:text></xsl:text>
					</xsl:attribute>
					<div class="panel-body">
						<xsl:value-of select="./accordion_desc" disable-output-escaping="yes"/>
					</div>
				</div>
			</div>
		</div>
</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>