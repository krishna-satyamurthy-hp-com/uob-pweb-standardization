<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:include href="http://www.interwoven.com/custom/iw/xsl/cardlanding/tiled_display_4.xsl"/>
  <xsl:include href="http://www.interwoven.com/custom/iw/xsl/cardlanding/tiled_image_display_2.xsl"/>
  <xsl:include href="http://www.interwoven.com/custom/iw/xsl/cardlanding/tiled_image_display_3.xsl"/>
  <xsl:include href="http://www.interwoven.com/custom/iw/xsl/cardlanding/cards-utility-links.xsl"/>
	<xsl:template name="cardlanding">
	  <xsl:for-each select="Properties/Data/Datum/DCR/root/tab_feature_segment">
      <div class="container">
        <div class="row sticky-wrapper">
          <xsl:variable name="segment_title">
            <xsl:value-of select="title"/>
          </xsl:variable>
          <xsl:for-each select="features/*">
            <xsl:choose>
              <xsl:when test="local-name()='tiled_display_4'">
                <section class="essential-services-block">
                  <xsl:if test="$segment_title != ''">
                    <h2>
                      <xsl:attribute name="class">
                        <xsl:text>heading2</xsl:text>
                      </xsl:attribute>
                      <xsl:value-of select="$segment_title" />
                    </h2>
                  </xsl:if>
                  <xsl:call-template name="tiled_display_4"/>
                </section>
              </xsl:when>
              <xsl:when test="local-name()='tiled_image_display_2'">
                <section class="more-than-just-cards-block pusher-b-30">
                  <xsl:if test="$segment_title != ''">
                    <h2>
                      <xsl:attribute name="class">
                        <xsl:text>heading2</xsl:text>
                      </xsl:attribute>
                      <xsl:value-of select="$segment_title" />
                    </h2>
                  </xsl:if>
                  <xsl:call-template name="tiled_image_display_2"/>
                </section>
              </xsl:when>
              <xsl:when test="local-name()='tiled_image_display_3'">
                <section class="more-than-just-cards-block pusher-b-30">
                  <xsl:if test="$segment_title != ''">
                    <h2>
                      <xsl:attribute name="class">
                        <xsl:text>heading2</xsl:text>
                      </xsl:attribute>
                      <xsl:value-of select="$segment_title" />
                    </h2>
                  </xsl:if>
                  <xsl:call-template name="tiled_image_display_3"/>
                </section>
              </xsl:when>
              <xsl:when test="local-name()='utility_link'">
                <section class="more-info-block pusher-b-30">
                  <xsl:if test="$segment_title != ''">
                    <h2>
                      <xsl:attribute name="class">
                        <xsl:text>heading2</xsl:text>
                      </xsl:attribute>
                      <xsl:value-of select="$segment_title" />
                    </h2>
                  </xsl:if>
                  <xsl:call-template name="utility_link"/>
                </section>
              </xsl:when>
              <xsl:otherwise>
                Failed to find XSL
              </xsl:otherwise>
            </xsl:choose>
          </xsl:for-each>
        </div>
      </div>
    </xsl:for-each>        
	</xsl:template>
</xsl:stylesheet>