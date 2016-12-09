<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="tiled_display_3">
		<div class="container">
			<div class="row sticky-wrapper">
				<section class="essential-services-block pusher-b-30"> 
					<xsl:apply-templates select="/Properties/Data/Datum[@ID='tiles-3-column']/DCR[@Type='3-column-tiles']/root"/>
				</section>
			</div>
		</div>
	</xsl:template>

	<xsl:template match="root">
		<xsl:choose>
			<xsl:when test="title != '' and subtitle != ''">
				<h2 class="heading2 subtitle"><xsl:value-of select="title" /></h2>
				<span><xsl:value-of select="subtitle" /></span>
			</xsl:when>
			<xsl:when test="title != '' and subtitle = ''">
				<h2 class="heading2"><xsl:value-of select="title" /></h2>
			</xsl:when>
			<xsl:otherwise>
			</xsl:otherwise>
		</xsl:choose>
		
			<xsl:call-template name="tile_detail"/>	
		
	</xsl:template>	

	<xsl:template name="tile_detail">
		<xsl:for-each select="tiled_display_3">
			<xsl:variable name="position-id"><xsl:value-of select="(position() mod 2)" /></xsl:variable>
			<div class="grid-wrapper col-3">
				<xsl:for-each select="tile_detail">

					<xsl:variable name="element_position-id"><xsl:value-of select="(position() mod 2)" /></xsl:variable>

					<div>
						<xsl:attribute name="class">
							<xsl:text>grid-content </xsl:text>
							<xsl:value-of select="tile_background"/>
							<!-- <xsl:if test="($position-id != 0) and ($element_position-id != 0)">
								<xsl:text>grid-whitesmoke</xsl:text>
							</xsl:if>
							<xsl:if test="($position-id = 0) and ($element_position-id = 0)">
								<xsl:text>grid-whitesmoke</xsl:text>
							</xsl:if> -->
							<xsl:if test="tile_background = 'gray' ">
								<xsl:text> grid-whitesmoke</xsl:text>
							</xsl:if>

						</xsl:attribute>
						<div class="inner">
							<div role="group">
							</div>
							<img src="" alt="">
								<xsl:if test="tile_image!=''">
									<xsl:attribute name="src">
										<xsl:value-of select="tile_image"/>
									</xsl:attribute>
									<xsl:attribute name="alt">
										<xsl:value-of select="tile_title"/>
									</xsl:attribute>
								</xsl:if>
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

		</xsl:for-each>
	</xsl:template>

</xsl:stylesheet>
