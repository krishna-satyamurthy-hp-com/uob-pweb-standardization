<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="tiled_display_4">

		<xsl:variable name="position-id"><xsl:value-of select="(position() mod 2)" /></xsl:variable>
		
		<div class="grid-wrapper col-4">

			<xsl:for-each select="tile_detail">

				<xsl:variable name="element_position-id"><xsl:value-of select="(position() mod 2)" /></xsl:variable>

				<div>
					<xsl:attribute name="class">
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
					</xsl:attribute>

					<a title="Activate your card" href="http://www.uob.com.sg/personal/cards/credit/card_activation.html">
						<xsl:attribute name="title">
							<xsl:value-of select="CTA_label"/>
						</xsl:attribute>
						<xsl:attribute name="href">
							<xsl:value-of select="CTA_link"/>
						</xsl:attribute>
						<div class="inner">
							<div role="group">
							</div>
							<img src="images/upload/card-icon.png" alt="Activate your card">
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

	</xsl:template>
</xsl:stylesheet>