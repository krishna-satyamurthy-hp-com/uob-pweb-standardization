<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="tiled_image_display_3">
	  <div class="row">
      <xsl:for-each select="tile_detail">
        <div class="col-md-4 col-sm-4 col-xs-6 image-item-wrap" style="height: 175px;">
          <a>
            <xsl:attribute name="title">
              <xsl:value-of select="tile_title"/>
            </xsl:attribute>
            <xsl:attribute name="href">
              <xsl:value-of select="tile_link"/>
            </xsl:attribute>
            <div class="img-wrapper">
              <img class="img-responsive">
                <xsl:attribute name="src">
                  <xsl:value-of select="tile_image"/>
                </xsl:attribute>
                <xsl:attribute name="data-uob-src-mobile">
                  <xsl:value-of select="tile_mobile_image"/>
                </xsl:attribute>
                <xsl:attribute name="alt">
                  <xsl:value-of select="tile_image_alt"/>
                </xsl:attribute>
              </img>
            </div>
            <div class="content-text" style="height: 50px;">
              <span>
                <xsl:attribute name="title">
                  <xsl:value-of select="tile_title"/>
                </xsl:attribute>
              </span>
            </div>
          </a>
        </div>
      </xsl:for-each>          
    </div>
	</xsl:template>
</xsl:stylesheet>