<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="promotion_2_col">
	<xsl:variable name="title-name"><xsl:value-of select="../preceding-sibling::title" /></xsl:variable>
	<xsl:variable name="unique-id"><xsl:value-of select="generate-id(.)" /></xsl:variable>
	
		 <div class="section-content">
            <div data-collapse="data-collapse" class="collapse-block no-border">
			<xsl:attribute name="data-group"><xsl:value-of select="$title-name"/></xsl:attribute>
			<xsl:for-each select="content">
              <div class="imageBox-content">
                <div class="imageBox-grid">
					<xsl:for-each select="promotion_detail">
						<div class="image-item-wrap-box">
							<a>
								<xsl:attribute name="href"><xsl:text>#</xsl:text><xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()" /></xsl:attribute>
								<xsl:attribute name="title">
									<xsl:value-of select="promotion_headline" disable-output-escaping="yes"  />
								</xsl:attribute>
								<xsl:attribute name="class">
									<xsl:text>collapse-nav</xsl:text>
								</xsl:attribute>
								<div class="img-wrapper">
									<img class="img-responsive">
										<xsl:attribute name="src">
											<xsl:value-of select="img"/>
										</xsl:attribute>
										<xsl:attribute name="alt">
											<xsl:value-of select="img_alt"/>
										</xsl:attribute>
										<xsl:if test="img_mobile !=''">
											<xsl:attribute name="data-uob-src-mobile">
												<xsl:value-of select="img_mobile"/>
											</xsl:attribute>
										</xsl:if>
									</img>
								</div>
								<div class="content-text">
									<xsl:value-of select="promotion_headline" disable-output-escaping="yes"  />
								</div>	
							</a>
						</div>
					</xsl:for-each>
				</div>
       
		
			<div class="collapse-body">
				<xsl:for-each select="promotion_detail">
				<xsl:if test="promotion_content != ''">
					<div>
						<xsl:attribute name="id">
							<xsl:value-of select="$unique-id"/><xsl:text>-</xsl:text><xsl:value-of select="position()" />
						</xsl:attribute>
						<xsl:attribute name="class">
							<xsl:text>collapse</xsl:text>
						</xsl:attribute>
						<xsl:value-of select="promotion_content" disable-output-escaping="yes"  />
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
			</div>
			</xsl:for-each>
			</div>
		</div>
		
	
	</xsl:template>
</xsl:stylesheet>