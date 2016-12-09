<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="footer">


<footer id="footer">
        <div role="contentinfo" class="container">
          <div class="pull-left">
            <div class="nav">
              <ul class="list-unstyled">
	<span in-context-edit="D01">
			  <xsl:for-each select="/Properties/Data/Datum[@ID='D01']/DCR/footer_nav/top_left">
                

<li>
 <xsl:if test="position() = last()">
      <xsl:attribute name="class">
						<xsl:text>last</xsl:text>
					</xsl:attribute>      </xsl:if>
<a>
					<xsl:attribute name="title">
						<xsl:value-of select="hover_text" />
					</xsl:attribute>
					<xsl:attribute name="href">
						<xsl:value-of select="link_text" />
					</xsl:attribute>
					<xsl:value-of select="title_text" />
				</a></li>
				</xsl:for-each>
               </span>
              </ul>
            </div>
            <div class="block-term">
              <xsl:value-of select="/Properties/Data/Datum[@ID='D01']/DCR/footer_nav/copyright_text" disable-output-escaping="yes" />
            </div>
          </div>
          <div class="pull-right">
            <div class="block-socials">
              <ul class="list-unstyled">
                <li><a title="Facebook" href="javascript:void(0);" class="ico-p-facebook">Facebook</a></li>
                <li><a title="Linkedin" href="javascript:void(0);" class="ico-p-linkedin"> Linkedin</a></li>
                <li><a title="Youtube" href="javascript:void(0);" class="ico-p-youtube">Youtube</a></li>
              </ul>
            </div>
            <div class="block-term">
              <ul class="list-unstyled">
			  <xsl:for-each select="/Properties/Data/Datum[@ID='D01']/DCR/footer_nav/bottom_right">
                <li><a>
					<xsl:attribute name="title">
						<xsl:value-of select="hover_text" />
					</xsl:attribute>
					<xsl:attribute name="href">
						<xsl:value-of select="link_text" />
					</xsl:attribute>
					<xsl:value-of select="title_text" />
				</a></li>
				</xsl:for-each>
              </ul>
            </div>
          </div>
        </div>
      </footer>
</xsl:template>
</xsl:stylesheet>