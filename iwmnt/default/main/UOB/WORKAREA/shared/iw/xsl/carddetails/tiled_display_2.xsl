<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="tiled_display_2">

		<xsl:variable name="unique-id"><xsl:value-of select="generate-id(.)" /></xsl:variable>
		<!--<div data-collapse="" class="collapse-block">-->

		<div class="section-content collapse-block">
			<xsl:for-each select="content">
			<xsl:variable name="nodePos" select="position()"/>
				<div data-collapse="data-collapse">
					<div class="grid-wrapper">
						<xsl:for-each select="tile_detail">

							<div>
								<xsl:attribute name="class">
									<xsl:text>grid-content </xsl:text>
									<xsl:if test="tile_background = 'gray'">
										<xsl:text>grid-whitesmoke</xsl:text>
									</xsl:if>
								</xsl:attribute>

								<div class="inner">
									<div role="group">
										<img>
											<xsl:attribute name="src">
												<xsl:value-of select="img"/>
											</xsl:attribute>
											<xsl:attribute name="alt">
												<xsl:value-of select="img_alt"/>
											</xsl:attribute>
										</img>

										<div class="descs">
											<h3><xsl:value-of select="tile_title"/></h3>
											<p><xsl:value-of select="tile_summary"/></p>
											<xsl:if test="cta_link != ''">
												<a>
													<xsl:attribute name="href">
														<xsl:value-of select="cta_link"/>
													</xsl:attribute>
													<xsl:attribute name="title">
														<xsl:value-of select="cta_label"/>
													</xsl:attribute>
													<xsl:attribute name="class">
														<xsl:text>link</xsl:text>
													</xsl:attribute>
													<xsl:value-of select="cta_label"/>
												</a>
											</xsl:if>
											<xsl:if test="tile_description != ''">
												<a>
													<xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="$nodePos" /><xsl:value-of select="position()" /></xsl:attribute>
													<xsl:attribute name="title">
														<xsl:text>Show more</xsl:text>
													</xsl:attribute>
													<xsl:attribute name="class">
														<xsl:text>collapse-nav more</xsl:text>
													</xsl:attribute>Show more</a>
												<a>
													<xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="$nodePos" /><xsl:value-of select="position()"/></xsl:attribute>
													<xsl:attribute name="title">
														<xsl:text>Show less</xsl:text>
													</xsl:attribute>
													<xsl:attribute name="class">
														<xsl:text>collapse-nav less</xsl:text>
													</xsl:attribute>Show less</a>
											</xsl:if>
										</div>
									</div>
								</div>
							</div>

						</xsl:for-each>
					</div>

					<div class="collapse-body">
						<xsl:for-each select="tile_detail">
							<xsl:if test="tile_description != ''">
								<div>
									<xsl:attribute name="id">
										<xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="$nodePos" /><xsl:value-of select="position()" />
									</xsl:attribute>
									<xsl:attribute name="class">
										<xsl:text>collapse</xsl:text>
									</xsl:attribute>

									<xsl:value-of select="tile_description" disable-output-escaping="yes"  />

									<div class="align-center">
										<a><xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="$nodePos" /><xsl:value-of select="position()" /></xsl:attribute>
											<xsl:attribute name="title">
												<xsl:text>Show less</xsl:text>
											</xsl:attribute>
											<xsl:attribute name="class">
												<xsl:text>collapse-nav</xsl:text>
											</xsl:attribute>Show less</a>
									</div>
								</div>
							</xsl:if>
						</xsl:for-each>
					</div>

				</div>
			</xsl:for-each>
		</div>

		<!--</div>-->

	</xsl:template>
</xsl:stylesheet>