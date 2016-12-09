<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" >

<xsl:template name="menu_3_column">
	<div class="section-content">
		<div class="content-block">
			<xsl:for-each select="content">
					<xsl:if test="position() != 1">
						<span class="divider space-bottom hidden-xs"></span>
					</xsl:if>
					<div class="row">
						<xsl:for-each select="menu_detail">
							  <div class="col-md-4 col-sm-4 col-sx-12">
							  <xsl:if test="menu_textarea != ''">
									<xsl:value-of select="menu_textarea" disable-output-escaping="yes"/><xsl:text>&#160;</xsl:text>
								</xsl:if>
								
								<xsl:if test="menu_link != ''">
								  <a>
									<xsl:attribute name="href">
										<xsl:value-of select="menu_link"/>
									</xsl:attribute>
									<xsl:attribute name="title">
										<xsl:value-of select="menu_title"/>
									</xsl:attribute>
									<xsl:value-of select="menu_title"/>
								  </a>
								 </xsl:if>
							  </div>
						</xsl:for-each>
					</div>
				</xsl:for-each>
		</div>
	</div>
</xsl:template>
</xsl:stylesheet>