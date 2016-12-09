<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="tiled_display_3">

		<xsl:variable name="position-id"><xsl:value-of select="(position() mod 2)" /></xsl:variable>
		<div class="grid-wrapper">
			<xsl:for-each select="tile_detail">


				<xsl:variable name="element_position-id"><xsl:value-of select="(position() mod 2)" /></xsl:variable>

				<div>
					<xsl:attribute name="class">
					<xsl:if test=". != ''">
						<xsl:text>grid-content </xsl:text>
						<!-- <xsl:if test="($position-id != 0) and ($element_position-id != 0)">
							<xsl:text>grid-whitesmoke</xsl:text>
						</xsl:if>
						<xsl:if test="($position-id = 0) and ($element_position-id = 0)">
							<xsl:text>grid-whitesmoke</xsl:text>
						</xsl:if> -->
						<xsl:choose> 
							<xsl:when test="tile_background='gray'">
								<xsl:text>grid-whitesmoke</xsl:text>
							</xsl:when> 
							<xsl:otherwise />
						</xsl:choose>
					</xsl:if>
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
							<xsl:attribute name="class">
								<xsl:text>custom-img-1</xsl:text>
							</xsl:attribute>
						</img>
						<div class="descs">
							<h3><xsl:value-of select="tile_title"/></h3>
							<p><xsl:value-of select="tile_summary"/></p>
							<xsl:if test="CTA_link != ''">
								<a>
									<xsl:attribute name="href">
										<xsl:value-of select="CTA_link"/>
									</xsl:attribute>
									<xsl:attribute name="title">
										<xsl:value-of select="CTA_label"/>
									</xsl:attribute>
									<xsl:attribute name="class">
										<xsl:text>link</xsl:text>
									</xsl:attribute>
									<xsl:value-of select="CTA_label"/>
								</a>
							</xsl:if>
						</div>
					</div>
				</div>

			</xsl:for-each>
		</div>
	</xsl:template>
</xsl:stylesheet>
