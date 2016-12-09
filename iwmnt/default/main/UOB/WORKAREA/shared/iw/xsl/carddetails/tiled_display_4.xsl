<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="tiled_display_4">

		<xsl:variable name="unique-id"><xsl:value-of select="generate-id(.)" /></xsl:variable>
		<!--<div data-collapse="" class="collapse-block">-->

		<div class="section-content">
			<xsl:for-each select="content">
				<xsl:variable name="nodePos" select="position()"/>
				
					<div class="grid-wrapper">
						<xsl:for-each select="tile_detail">

							<div>
								<xsl:attribute name="class">
									<xsl:text>grid-content </xsl:text>
									<xsl:if test="tile_background = 'gray'">
										<xsl:text>grid-whitesmoke</xsl:text>
									</xsl:if>
								</xsl:attribute>

								<a>
									<xsl:attribute name="title">
										<xsl:value-of select="CTA_label"/>
									</xsl:attribute>
									<xsl:attribute name="href">
										<xsl:value-of select="CTA_link"/>
									</xsl:attribute>
									<div class="inner">
										<div role="group">
										</div>
										<img>
											<xsl:attribute name="src">
												<xsl:value-of select="tile_image"/>
											</xsl:attribute>
											<xsl:attribute name="alt">
												<xsl:value-of select="tile_title"/>
											</xsl:attribute>
										</img>
										<div class="descs">
											<h3><xsl:value-of select="tile_title"/></h3>
											<p><xsl:value-of select="tile_summary"/></p>
										</div>
									</div>
								</a>
							</div>

						</xsl:for-each>
					</div>

				
			</xsl:for-each>
		</div>

		<!--</div>-->

	</xsl:template>
</xsl:stylesheet>