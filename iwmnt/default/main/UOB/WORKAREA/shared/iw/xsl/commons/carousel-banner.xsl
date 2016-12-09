<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="carousel_banner">
		<div class="container">
			<div class="row sticky-wrapper">
				<xsl:choose>
					<xsl:when test="count(/Properties/Data/Datum/DCR/root/banner_details) = 1">

						<div class="main-banner">
							<img class="img-responsive">
								<xsl:attribute name="src">
									<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/bannerImgDesktop" />
								</xsl:attribute>
								<xsl:attribute name="alt">
									<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/bannerAltText" />
								</xsl:attribute>
							</img>
							<div class="description">
								<xsl:if test="/Properties/Data/Datum/DCR/root/banner_details/heading != '' " >
									<h2 class="heading2"><xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/heading" /></h2>
								</xsl:if>
								<xsl:if test="/Properties/Data/Datum/DCR/root/banner_details/subHeading != '' " >
									<ul class="list-disc">
										<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/subHeading" disable-output-escaping="yes" />
									</ul>
								</xsl:if>
								<xsl:if test="/Properties/Data/Datum/DCR/root/banner_details/ctaText != '' " >
									<a>
										<xsl:attribute name="href">
											<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/ctaLink" />
										</xsl:attribute>
										<xsl:attribute name="title">
											<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/ctaText" />
										</xsl:attribute>
										<xsl:attribute name="class">
											<xsl:text>btn-1</xsl:text>
											<xsl:if test="ctaColor = 'red' ">
															<xsl:text> btn-red</xsl:text>
														</xsl:if>
										</xsl:attribute>
										<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/ctaText" />
									</a>
								</xsl:if>
							</div>
						</div>
					</xsl:when>
					<xsl:otherwise>
						<div class="main-banner bxslider-type-2">

							<ul class="list-unstyled">
								<xsl:for-each select="/Properties/Data/Datum/DCR/root/banner_details">
									<li>
										<xsl:if test="bannerBackgroundStyle != 'dark'">
											<xsl:attribute name="class">
												<xsl:text>light-banner</xsl:text>
											</xsl:attribute>
										</xsl:if>

										<img>
											<xsl:attribute name="src">
												<xsl:value-of select="bannerImage" />
											</xsl:attribute>
											<xsl:attribute name="alt">
												<xsl:value-of select="bannerAltText" />
											</xsl:attribute>
											<xsl:attribute name="class">
												<xsl:text>img-responsive</xsl:text>
											</xsl:attribute>
										</img>
										<div class="description">
											<xsl:if test="heading != '' ">
												<h2 class="heading2"><xsl:value-of select="heading" /></h2>
											</xsl:if>
											<xsl:if test="subHeading != '' ">
												<xsl:value-of select="subHeading" disable-output-escaping="yes"/>
											</xsl:if>
											<xsl:if test="ctaText != '' ">
												<a class="btn-1">
													<xsl:attribute name="href">
														<xsl:value-of select="ctaLink" />
													</xsl:attribute>
													<xsl:attribute name="title">
														<xsl:value-of select="ctaText" />
													</xsl:attribute>
													<xsl:attribute name="class">
														<xsl:text>btn-1</xsl:text>
														<xsl:if test="ctaColor = 'red' ">
															<xsl:text> btn-red</xsl:text>
														</xsl:if>
													</xsl:attribute>
													<xsl:value-of select="ctaText" />
												</a>
											</xsl:if>
										</div>
									</li>

								</xsl:for-each>				

							</ul>
						</div>


					</xsl:otherwise>	
				</xsl:choose>
			</div>
		</div>
	</xsl:template>
</xsl:stylesheet>