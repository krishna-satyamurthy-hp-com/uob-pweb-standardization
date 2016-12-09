<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="sidebar">
<div class="row">
<div class="d-wideget">
              <div class="dock" style="right: 163px;"><span class="w-close" data-uob-tg-mobile="show"></span>
                <div class="out-dock">
                  <ul class="key-wideget">
				  <xsl:for-each select="/Properties/Data/Datum[@ID='D01']/DCR[@Type='sidebar']/sidebar_nav/content">
                    <li>
					  <span class="content">
						  <span>
						    <xsl:attribute name="class">
									icon <xsl:value-of select="icon_name" />
								</xsl:attribute>
						  </span>
							<a class="text" data-uob-tg-mobile="show">
								<xsl:attribute name="title">
									<xsl:value-of select="hover_text" />
								</xsl:attribute>
								<xsl:attribute name="href">
									<xsl:value-of select="link_text" />
								</xsl:attribute>
								<xsl:value-of select="title_text" />
							</a>
					  </span>
					</li>
                   </xsl:for-each>
					<li class="social-tab"><span class="content"><span class="icon icon-social"></span><span class="text" data-uob-tg-mobile="show">Follow us</span></span></li>
                  </ul>
                  <ul class="side-wideget">
				  <xsl:for-each select="/Properties/Data/Datum[@ID='D01']/DCR[@Type='sidebar']/sidebar_nav/content">
                    <li data-uob-tg-mobile="hide">
					<a>
						<xsl:attribute name="title">
							<xsl:value-of select="hover_text" />
						</xsl:attribute>
						<xsl:attribute name="href">
							<xsl:value-of select="link_text" />
						</xsl:attribute>
						<xsl:value-of select="title_text" />
					</a>
					</li>
                    </xsl:for-each>
                    <li class="social"> <a title="Facebook" href="javascript:void(0);"><span class="fa fa-facebook"></span></a><a title="Linkedin" href="javascript:void(0);"><span class="fa fa-linkedin"></span></a><a title="Youtube" href="javascript:void(0);"><span class="fa fa-youtube-play"></span></a></li>
                  </ul>
                </div>
              </div>
			  <a title="Closetab" class="closetab" href="javascript:;"></a>
            </div>
			</div>
  </xsl:template>
  </xsl:stylesheet>