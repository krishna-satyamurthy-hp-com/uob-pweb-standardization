<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" >

	<xsl:template name="free_text_2_column">
	<xsl:variable name="unique-id"><xsl:value-of select="generate-id(.)" /></xsl:variable>
		<div class="section-content">
			<div class="nav-tab-content">
				<ul role="tablist" class="nav nav-tabs nav-justified">
					<xsl:for-each select="content">
						<xsl:variable name="nodePos" select="position()"/>							
						<li>
							<xsl:if test="position() = 1">
								<xsl:attribute name="class">
									<xsl:text>active</xsl:text>
								</xsl:attribute>
							</xsl:if>
							<a>
								<xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="$nodePos" /></xsl:attribute>
								<xsl:attribute name="data-toggle">
									<xsl:text>tab</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="title">
									<xsl:value-of select="text_heading"/>
								</xsl:attribute>
								<xsl:attribute name="role">
									<xsl:text>tab</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="aria-controls">
									<xsl:value-of select="text_heading"/>
								</xsl:attribute>
								<xsl:attribute name="tabindex">
									<xsl:text>0</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="aria-selected">
									<xsl:text>false</xsl:text>
								</xsl:attribute>
								<xsl:value-of select="text_heading"/>
							</a>
						</li>
					</xsl:for-each>
				</ul>

				<div>
				<xsl:attribute name="class">
									<xsl:text>tab-content</xsl:text>
									<xsl:if test="display = 'column'">
										<xsl:text> col-2</xsl:text>
									</xsl:if>
								</xsl:attribute>
					<xsl:for-each select="content">
					<xsl:variable name="nodePos" select="position()"/>	
						<xsl:variable name="lowercase-text">
								<xsl:call-template name="to-lowercase">
									<xsl:with-param name="string" select="text_heading"/>
								</xsl:call-template>
						</xsl:variable>
						<div>
							<xsl:attribute name="class">
									<xsl:text>tab-pane</xsl:text>
									<xsl:if test="position() = 1">
									<xsl:text> active</xsl:text>
									</xsl:if>
								</xsl:attribute>
								<xsl:attribute name="id">
									<xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="$nodePos" />
								</xsl:attribute>
							<h5 class="heading5"><xsl:value-of select="text_heading"/></h5>
							<xsl:value-of select="text_desc" disable-output-escaping="yes"/>
						</div>
					</xsl:for-each> 
				</div>

			</div>
		</div>
		
	</xsl:template>
</xsl:stylesheet>