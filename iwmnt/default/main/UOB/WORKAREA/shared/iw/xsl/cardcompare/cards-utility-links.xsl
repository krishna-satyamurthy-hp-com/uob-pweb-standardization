<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="utility_link">
	  <div class="container outer">
      <xsl:for-each select="link_detail[position() mod 3 = 1]" >
        <div class="row">
          <div class="col-md-4 col-sm-4 col-sx-12">
            <xsl:value-of select="link_content" disable-output-escaping="yes" />
          </div>
          <xsl:if test="count(following-sibling::link_detail) &gt; 0">
            <div class="col-md-4 col-sm-4 col-sx-12">
              <xsl:value-of select="following-sibling::link_detail[1]/link_content" disable-output-escaping="yes" />
            </div>
          </xsl:if>
          <xsl:if test="count(following-sibling::link_detail) &gt; 1">
            <div class="col-md-4 col-sm-4 col-sx-12">
              <xsl:value-of select="following-sibling::link_detail[2]/link_content" disable-output-escaping="yes" />
            </div>
          </xsl:if> 
        </div>
        <xsl:if test="position() &lt; last()">
          <span class="divider hidden-xs"></span>
        </xsl:if>
      </xsl:for-each>
    </div>
	</xsl:template>
</xsl:stylesheet>