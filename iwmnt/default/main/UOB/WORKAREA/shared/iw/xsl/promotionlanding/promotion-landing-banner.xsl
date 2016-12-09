<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="promotion_landing_banner">

		<div id="main" class="container">
			<div class="row sticky-wrapper">

				<h1 class="heading1"><xsl:value-of select="/Properties/Data/Datum[@ID='pageName']" />
				</h1>

			</div>
		</div>
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
								<h2 class="heading2"><xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/bannerText" /></h2>
								<ul class="list-disc">
									<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/bannerDesc" disable-output-escaping="yes" />
								</ul>
								<xsl:if test="/Properties/Data/Datum/DCR/root/banner_details/ctaText != ''" >
									<a>
										<xsl:attribute name="href">
											<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/ctaLink" />
										</xsl:attribute>
										<xsl:attribute name="title">
											<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/ctaText" />
										</xsl:attribute>
										<xsl:attribute name="class">
											<xsl:text>btn-1</xsl:text>
										</xsl:attribute>
										<xsl:value-of select="/Properties/Data/Datum/DCR/root/banner_details/ctaText" />
									</a>
								</xsl:if>
							</div>
						</div>

					</xsl:when>
					<xsl:otherwise>
						<div class="main-banner bxslider-type-2">														
									<ul class="list-unstyled" style="width: auto; position: relative;">
										<xsl:for-each select="/Properties/Data/Datum/DCR/root/banner_details">
											<li class="light-banner" style="float: none; list-style: none; position: absolute; display: block; width: 1180px; z-index: 50;">
												<img>
													<xsl:attribute name="src">
														<xsl:value-of select="bannerImgDesktop" />
													</xsl:attribute>
													<xsl:attribute name="alt">
														<xsl:value-of select="bannerAltText" />
													</xsl:attribute>
													<xsl:attribute name="class">
														<xsl:text>img-responsive</xsl:text>
													</xsl:attribute>
												</img>
												<div class="description">
													<h2 class="heading2"><xsl:value-of select="bannerText" /></h2>
													<xsl:value-of select="bannerDesc" disable-output-escaping="yes" />
													<xsl:if test="ctaText != '' ">
														<a>
															<xsl:attribute name="href">
																<xsl:value-of select="ctaLink" />
															</xsl:attribute>
															<xsl:attribute name="title">
																<xsl:value-of select="ctaText" />
															</xsl:attribute>
															<xsl:attribute name="class">
																<xsl:text>btn-1</xsl:text>
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