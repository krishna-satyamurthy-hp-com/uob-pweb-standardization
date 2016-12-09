<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="tiled_display_2">

		<xsl:variable name="unique-id"><xsl:value-of select="generate-id(.)" /></xsl:variable>
		<!--<div data-collapse="" class="collapse-block">-->

			<xsl:variable name="position-id"><xsl:value-of select="(position() mod 2)" /></xsl:variable>

			<xsl:for-each select="tile_detail">
				<xsl:if test="(position() mod 2) != 0">
					<div class="grid-wrapper">

						<div>
							<xsl:attribute name="class">
								<xsl:text>grid-content </xsl:text>
								<!-- 
								<xsl:if test="$position-id != 0">
									<xsl:text>grid-whitesmoke</xsl:text>
								</xsl:if>
								 -->
								<xsl:choose> 
									<xsl:when test="tile_background='gray'">
										<xsl:text>grid-whitesmoke</xsl:text>
									</xsl:when> 
									<xsl:otherwise />
								</xsl:choose>

							</xsl:attribute>
							<div class="inner">
								<figure role="group">
									<img>
										<xsl:attribute name="src">
											<xsl:value-of select="tile_image"/>
										</xsl:attribute>
										<xsl:attribute name="alt">
											<xsl:value-of select="tile_title"/>
										</xsl:attribute>
									</img>

									<figcaption class="descs">
										<h3><xsl:value-of select="tile_title"/></h3>
										<p><xsl:value-of select="tile_summary"/></p>
										<xsl:if test="tile_description != ''">
											<a>
												<xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()" /></xsl:attribute>
												<xsl:attribute name="title">
													<xsl:text>Show more</xsl:text>
												</xsl:attribute>
												<xsl:attribute name="class">
													<xsl:text>collapse-nav more</xsl:text>
												</xsl:attribute>Show more</a>
											<a>
												<xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()"/></xsl:attribute>
												<xsl:attribute name="title">
													<xsl:text>Show less</xsl:text>
												</xsl:attribute>
												<xsl:attribute name="class">
													<xsl:text>collapse-nav less</xsl:text>
												</xsl:attribute>Show less</a>
										</xsl:if>
									</figcaption>
								</figure>
							</div>
						</div>
						<div>
							<xsl:attribute name="class">
								<xsl:text>grid-content </xsl:text>
								<!-- 
								<xsl:if test="$position-id != 0">
									<xsl:text>grid-whitesmoke</xsl:text>
								</xsl:if>
								 -->
								<xsl:choose> 
									<xsl:when test="tile_background='gray'">
										<xsl:text>grid-whitesmoke</xsl:text>
									</xsl:when> 
									<xsl:otherwise />
								</xsl:choose>

							</xsl:attribute>
							<div class="inner">
								<figure role="group">
									<img>
										<xsl:attribute name="src">
											<xsl:value-of select="following-sibling::*[1]/tile_image"/>
										</xsl:attribute>
										<xsl:attribute name="alt">
											<xsl:value-of select="following-sibling::*[1]/tile_title"/>
										</xsl:attribute>
									</img>

									<figcaption class="descs">
										<h3><xsl:value-of select="following-sibling::*[1]/tile_title"/></h3>
										<p><xsl:value-of select="following-sibling::*[1]/tile_summary"/></p>
										<xsl:if test="following-sibling::*[1]/tile_description != ''">
											<a>
												<xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()+1" /></xsl:attribute>
												<xsl:attribute name="title">
													<xsl:text>Show more</xsl:text>
												</xsl:attribute>
												<xsl:attribute name="class">
													<xsl:text>collapse-nav more</xsl:text>
												</xsl:attribute>Show more</a>
											<a>
												<xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()+1" /></xsl:attribute>
												<xsl:attribute name="title">
													<xsl:text>Show less</xsl:text>
												</xsl:attribute>
												<xsl:attribute name="class">
													<xsl:text>collapse-nav less</xsl:text>
												</xsl:attribute>Show less</a>
										</xsl:if>
									</figcaption>
								</figure>
							</div>
						</div>

					</div>
				</xsl:if>

			</xsl:for-each>

			<div class="collapse-body">
				<xsl:for-each select="tile_detail">
					<xsl:if test="tile_description != ''">
						<div>
							<xsl:attribute name="id">
								<xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()" />
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>collapse</xsl:text>
							</xsl:attribute>
							<xsl:value-of select="tile_description" disable-output-escaping="yes"  />
							<div class="align-center">
								<a><xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()" /></xsl:attribute>
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
			<xsl:if test="up_link_title != ''">
				<div class="align-center other-link">
					<a>
						<xsl:attribute name="title">
							<xsl:value-of select="up_link_title"/>
						</xsl:attribute>
						<xsl:attribute name="href">
							<xsl:value-of select="up_link"/>
						</xsl:attribute>
						<xsl:value-of select="up_link_title"/>
					</a>
				</div>
			</xsl:if>


		<!--</div>-->

	</xsl:template>
</xsl:stylesheet>