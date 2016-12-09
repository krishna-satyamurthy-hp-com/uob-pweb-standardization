<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" >

<xsl:template name="apply_now">
	<div class="section-content">
        <div class="content-block apply-block">
			<div class="grid-wrapper">
				<xsl:for-each select="content_column">
					<div class="grid-content grid-whitesmoke">
						<h3 class="heading"><xsl:value-of select="column_title" /></h3>
						<div class="inner">
							<xsl:for-each select="content_item">
								<h4 class="heading"><xsl:value-of select="./column_title" /></h4>
								<figure>
									<xsl:attribute name="class">
										<xsl:if test="position() != 1">
											<xsl:text>pusher-t-40</xsl:text>
										</xsl:if>
									</xsl:attribute>
									<img>
										<xsl:attribute name="src">
											<xsl:value-of select="./item_image"/>
										</xsl:attribute>
										<xsl:attribute name="alt">
											<xsl:value-of select="./item_image_alt"/>
										</xsl:attribute>
									</img>	
									<figcaption class="descs">
										<xsl:value-of select="./item_desc" disable-output-escaping="yes"/>
										<xsl:if test="apply_link != ''">
										<span class="link">
											<a class="btn-1">
												<xsl:attribute name="href">
													<xsl:value-of select="apply_link"/>
												</xsl:attribute>
												<xsl:attribute name="title">
													<xsl:value-of select="apply_link_title"/>
												</xsl:attribute>
												<xsl:value-of select="apply_link_title"/>
											 </a>
										</span>
										</xsl:if>
									</figcaption>
									
								</figure>
								
							</xsl:for-each>
						</div>
					</div>
				</xsl:for-each>
			</div>
		</div>
	</div>
</xsl:template>
</xsl:stylesheet>