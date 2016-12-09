<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="promotion_categories">

		<div class="container">
			<div class="row sticky-wrapper">
				<section class="promotion-landing-block pusher-b-30 last-block-mobile">
					<div class="container">
						<div class="row">
							<xsl:for-each select="Properties/Data/Datum/DCR/root/promo_category_details">
								<div class="col-md-4 col-sm-4 col-xs-6 image-item-wrap">
									<a>
										<xsl:attribute name="title">
											<xsl:value-of select="category_link_title"/>
										</xsl:attribute>
										<xsl:attribute name="href">
											<xsl:value-of select="category_link"/>
										</xsl:attribute>
										<div class="img-wrapper">
											<img>
												<xsl:attribute name="src">
													<xsl:value-of select="category_image"/>
												</xsl:attribute>
												<xsl:attribute name="alt">
													<xsl:value-of select="category_alt_text"/>
												</xsl:attribute>
												<xsl:attribute name="data-uob-src-mobile">
													<xsl:value-of select="category_image"/>
												</xsl:attribute>
												<xsl:attribute name="class">
													<xsl:text>img-responsive</xsl:text>
												</xsl:attribute>
											</img>
										</div>
										<div class="content-text">
										<span><xsl:value-of select="promo_category_name"/></span>
										
										</div>
									</a>
								</div>
							</xsl:for-each>	
						</div>
					</div>
				</section>
			</div>
		</div>

	</xsl:template>
</xsl:stylesheet>