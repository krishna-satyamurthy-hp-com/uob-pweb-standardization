<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="img_3_colum">
		<xsl:if test="position() != 1">
			<div class="container-division" style="height: 30px;"></div>
		</xsl:if>
		<div class="container">
			<div class="row">
				<xsl:for-each select="img_tile_detail">
					<div class="col-md-4 col-sm-4 col-xs-6 image-item-wrap">
						<a>
							<xsl:attribute name="href">
								<xsl:value-of select="img_link"/>
							</xsl:attribute>
							<xsl:attribute name="title">
								<xsl:value-of select="img_title"/>
							</xsl:attribute>
							<div class="img-wrapper">
							<img>
								<xsl:attribute name="src">
								<xsl:value-of select="img"/>
							</xsl:attribute>
							<xsl:attribute name="alt">
								<xsl:value-of select="img_alt"/>
							</xsl:attribute>
							<xsl:attribute name="data-uob-src-mobile">
								<xsl:value-of select="img"/>
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>img-responsive</xsl:text>
							</xsl:attribute>
							</img>
							</div>
							<div class="content-text"><span><xsl:value-of select="img_label"/></span></div>
							</a>
						</div>
					</xsl:for-each>  
				</div>
				</div>

			</xsl:template>
		</xsl:stylesheet>