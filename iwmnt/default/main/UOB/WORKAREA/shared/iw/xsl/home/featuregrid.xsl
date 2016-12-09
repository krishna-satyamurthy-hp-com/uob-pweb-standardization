<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="featuregrid">
 <div class="container">
  <div class="row">

      		<div id="home-table" class="tbl-content">
			<xsl:for-each select="Properties/Data/Result/Root/FeatureGrid">
			<xsl:variable name="allignment" select="'left'" />
			<xsl:choose>
			<xsl:when test="(position() mod 2) != 0">
				<div class="grid-wrapper">
					<div>
					  <xsl:attribute name="class">
						<xsl:text>grid-content </xsl:text>
						<!-- <xsl:if test="(position()mod 4)= 1">
							<xsl:text>grid-gray</xsl:text>
						</xsl:if> -->
						<xsl:if test="Grid_Background='gray'">
							<xsl:text>grid-gray</xsl:text>
						</xsl:if>
					  </xsl:attribute>
					  <a class="inner">
						<xsl:attribute name="href">
							<xsl:value-of select="Banner_Link"/>
						</xsl:attribute>
						<xsl:attribute name="title">
							<xsl:value-of select="Grid_Alt_Text"/>
						</xsl:attribute>
						<figure role="group">
						<xsl:if test="string-length(Grid_Icon) != 0">
						<img>
							<xsl:attribute name="src">
								<xsl:value-of select="Grid_Icon"/>
							</xsl:attribute>
							<xsl:attribute name="alt">
								<xsl:value-of select="Grid_Alt_Text"/>
							</xsl:attribute>
						</img>
						</xsl:if>
						<figcaption class="descs">
							<h3><xsl:value-of select="Grid_Text_1"/></h3>
							<p>	<xsl:value-of select="Grid_Text_2"/></p>
						</figcaption>
						</figure>
					  </a>
				  </div>
				  <div>
					  <xsl:attribute name="class">
						<xsl:text>grid-content </xsl:text>
						<!-- <xsl:if test="(position()mod 4)= 3">
							<xsl:text>grid-gray</xsl:text>
						</xsl:if> -->
						<xsl:if test="following-sibling::*[1]/Grid_Background='gray'">
							<xsl:text>grid-gray</xsl:text>
						</xsl:if>
					  </xsl:attribute>
					  <a class="inner">
						<xsl:attribute name="href">
							<xsl:value-of select="following-sibling::*[1]/Banner_Link"/>
						</xsl:attribute>
						<xsl:attribute name="title">
							<xsl:value-of select="following-sibling::*[1]/Grid_Alt_Text"/>
						</xsl:attribute>
						<figure role="group">
						<xsl:if test="string-length(following-sibling::*[1]/Grid_Icon) != 0">
						<img>
							<xsl:attribute name="src">
								<xsl:value-of select="following-sibling::*[1]/Grid_Icon"/>
							</xsl:attribute>
							<xsl:attribute name="alt">
								<xsl:value-of select="following-sibling::*[1]/Grid_Alt_Text"/>
							</xsl:attribute>
						</img>
						</xsl:if>
						<figcaption class="descs">
							<h3><xsl:value-of select="following-sibling::*[1]/Grid_Text_1"/></h3>
							<p>	<xsl:value-of select="following-sibling::*[1]/Grid_Text_2"/></p>
						</figcaption>
						</figure>
					  </a>
				  </div>
				  </div>
			</xsl:when>
			<xsl:otherwise>

			</xsl:otherwise>
			</xsl:choose>
			</xsl:for-each>
          </div>
		 </div>
		</div>
</xsl:template>
</xsl:stylesheet>
