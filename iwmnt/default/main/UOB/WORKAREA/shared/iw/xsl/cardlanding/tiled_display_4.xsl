<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="tiled_display_4">
    <div class="grid-wrapper col-4">
      <xsl:for-each select="tile_detail[position() mod 2 = 1]">
        <div class="grid-content grid-whitesmoke">
          <a>
            <xsl:attribute name="title">
              <xsl:value-of select="tile_title"/>
            </xsl:attribute>
            <xsl:attribute name="href">
              <xsl:value-of select="tile_link"/>
            </xsl:attribute>
            <div class="inner">
              <img>
                <xsl:attribute name="src">
                  <xsl:value-of select="tile_image"/>
                </xsl:attribute>
                <xsl:attribute name="alt">
                  <xsl:value-of select="tile_link"/>
                </xsl:attribute>
              </img>
              <div class="descs">
                <h3>
                  <xsl:value-of select="tile_title"/>
                </h3>
                <p>
                  <xsl:value-of select="tile_summary"/>
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="grid-content">
          <xsl:if test="count(following-sibling::*) &gt; 0">
            <a>
            <xsl:attribute name="title">
              <xsl:value-of select="following-sibling::*[1]/tile_title"/>
            </xsl:attribute>
            <xsl:attribute name="href">
              <xsl:value-of select="following-sibling::*[1]/tile_link"/>
            </xsl:attribute>
            <div class="inner">
              <img>
                <xsl:attribute name="src">
                  <xsl:value-of select="following-sibling::*[1]/tile_image"/>
                </xsl:attribute>
                <xsl:attribute name="alt">
                  <xsl:value-of select="following-sibling::*[1]/tile_link"/>
                </xsl:attribute>
              </img>
              <div class="descs">
                <h3>
                  <xsl:value-of select="following-sibling::*[1]/tile_title"/>
                </h3>
                <p>
                  <xsl:value-of select="following-sibling::*[1]/tile_summary"/>
                </p>
              </div>
            </div>
          </a>
          </xsl:if>
        </div>
      </xsl:for-each>          
    </div>
	</xsl:template>
</xsl:stylesheet>