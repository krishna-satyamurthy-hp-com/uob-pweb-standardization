<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template name="herobanner">

  <div class="container">
  <div class="row">
  <div class="mainbanner" id="mainbanner">
              <ul class="bxslider list-unstyled">
			  <!-- Starting Loop -->
				<xsl:for-each select="Properties/Data/Result/Root/HeroBanner">
					<li class="banner-slider">
						<xsl:attribute name="id">
							<xsl:text>slide-</xsl:text><xsl:value-of select="position()"/>
						</xsl:attribute>
						<img>
							<xsl:attribute name="src">
								<xsl:value-of select="Banner_Image"/>
							</xsl:attribute>
							<xsl:attribute name="alt">
								<xsl:value-of select="Banner_Alt_Text"/>
							</xsl:attribute>
						</img>
						<xsl:choose>
							<!-- when for Left Type && CTA label empty-->
							<xsl:when test="Banner_Position ='html-text-on-left' and not(CTA_Label != '')">
							<div>
								<xsl:if test="Banner_Background_Style = 'bright'">
								<xsl:attribute name="class">
									<xsl:text>main-banner left</xsl:text>
								</xsl:attribute>
								</xsl:if>
								<xsl:if test="Banner_Background_Style = 'dark'">
								<xsl:attribute name="class">
									<xsl:text>main-banner dark-bg left</xsl:text>
								</xsl:attribute>
								</xsl:if>
								<div class="caption">
								  <h2><xsl:value-of select="Banner_Headline_Text"/></h2>
								  <p data-uob-tg-desktop="show"><xsl:value-of select="Banner_Sub_heading_Text"/></p>
								</div>
							  </div>
							</xsl:when>
							<!-- when for Left Type && CTA Label not empty -->
							<xsl:when test="Banner_Position ='html-text-on-left' and (CTA_Label != '')">
							  <div>
								  <xsl:if test="Banner_Background_Style = 'bright'">
									<xsl:attribute name="class">
										<xsl:text>main-banner left</xsl:text>
									</xsl:attribute>
									</xsl:if>
									<xsl:if test="Banner_Background_Style = 'dark'">
									<xsl:attribute name="class">
										<xsl:text>main-banner dark-bg left</xsl:text>
									</xsl:attribute>
									</xsl:if>
							  <div class="caption">
								<h2><xsl:value-of select="Banner_Headline_Text"/></h2>
								<p data-uob-tg-desktop="show"><xsl:value-of select="Banner_Sub_heading_Text"/></p>
								<a class="btn-1">
								  <xsl:attribute name="href">
									<xsl:value-of select="CTA_Link"/>
								  </xsl:attribute>
								  <xsl:attribute name="title">
									<xsl:value-of select="CTA_Label"/>
								  </xsl:attribute>
								  <xsl:value-of select="CTA_Label"/>
								  </a>
							  </div>
							  </div>
							</xsl:when>
							<!-- when for Right Type && CTA Label empty-->
							  <xsl:when test="Banner_Position ='html-text-on-right' and not(CTA_Label != '')">
							  <div>
							   <xsl:if test="Banner_Background_Style = 'bright'">
									<xsl:attribute name="class">
										<xsl:text>main-banner right</xsl:text>
									</xsl:attribute>
									</xsl:if>
									<xsl:if test="Banner_Background_Style = 'dark'">
									<xsl:attribute name="class">
										<xsl:text>main-banner dark-bg right</xsl:text>
									</xsl:attribute>
									</xsl:if>
								<div class="caption">
								  <h2><xsl:value-of select="Banner_Headline_Text"/></h2>
								  <p data-uob-tg-desktop="show"><xsl:value-of select="Banner_Sub_heading_Text"/></p>
								</div>
								</div>
							  </xsl:when>
							<!-- when for Right Type && CTA Label not empty -->
							<xsl:when test="Banner_Position ='html-text-on-right' and (CTA_Label != '')">
							<div>
							<xsl:if test="Banner_Background_Style = 'bright'">
									<xsl:attribute name="class">
										<xsl:text>main-banner right</xsl:text>
									</xsl:attribute>
									</xsl:if>
									<xsl:if test="Banner_Background_Style = 'dark'">
									<xsl:attribute name="class">
										<xsl:text>main-banner dark-bg right</xsl:text>
									</xsl:attribute>
									</xsl:if>
							<div class="caption">
							  <h2><xsl:value-of select="Banner_Headline_Text"/></h2>
							  <p data-uob-tg-desktop="show"><xsl:value-of select="Banner_Sub_heading_Text"/></p>
							  <a class="btn-1">
								<xsl:attribute name="href">
								  <xsl:value-of select="CTA_Link"/>
								</xsl:attribute>
								<xsl:attribute name="title">
								  <xsl:value-of select="CTA_Label"/>
								</xsl:attribute>
								<xsl:value-of select="CTA_Label"/>
								</a>
							</div>
							</div>
							</xsl:when>
						<!-- when for Middle Type && CTA Label empty-->
							  <xsl:when test="Banner_Position ='image-only' and not(CTA_Label != '')">
							  <div>
							  <xsl:if test="Banner_Background_Style = 'bright'">
									<xsl:attribute name="class">
										<xsl:text>main-banner middle</xsl:text>
									</xsl:attribute>
									</xsl:if>
									<xsl:if test="Banner_Background_Style = 'dark'">
									<xsl:attribute name="class">
										<xsl:text>main-banner dark-bg middle</xsl:text>
									</xsl:attribute>
									</xsl:if>
							  </div>
							  </xsl:when>
						  <!-- when for Middle Type && CTA Lable empty -->
							<xsl:when test="Banner_Position ='image-only' and (CTA_Label != '')">
							<div>
							 <xsl:if test="Banner_Background_Style = 'bright'">
									<xsl:attribute name="class">
										<xsl:text>main-banner middle</xsl:text>
									</xsl:attribute>
									</xsl:if>
									<xsl:if test="Banner_Background_Style = 'dark'">
									<xsl:attribute name="class">
										<xsl:text>main-banner dark-bg middle</xsl:text>
									</xsl:attribute>
									</xsl:if>
							<div class="caption">
								<a class="btn-1">
								<xsl:attribute name="href">
								  <xsl:value-of select="CTA_Link"/>
								</xsl:attribute>
								  <xsl:attribute name="title">
									<xsl:value-of select="CTA_Label"/>
								  </xsl:attribute>
									<xsl:value-of select="CTA_Label"/>
								  </a>
							</div>
							</div>
							</xsl:when>
						  <xsl:otherwise></xsl:otherwise>
					    </xsl:choose>
					</li>
				</xsl:for-each>
		<!--
                <li id="slide-01" class="banner-slider"><img src="images/upload/slider-1.jpg" alt="Apple Pay">
                  <div class="main-banner right">
                    <div class="caption">
                      <h2>UOB Welcomes Apple Pay.<br>The new, easy way to pay.</h2>
                      <p data-tg-desktop="show">Get more with higher interest of up to 3.33% p.a.</p>
					  <a href="javascript:void(0);" title="Find out more" class="btn-1">Find out more</a>
                    </div>
                  </div>
                </li>
                <li id="slide-02" class="banner-slider"><img src="images/upload/slider-2.jpg" alt="It Pays to Play Favourites">
                  <div class="main-banner middle">
                    <div class="caption">

					  <a href="javascript:void(0);" title="Find out more" class="btn-1">Find out more   </a>

                    </div>
                  </div>
                </li>
                <li id="slide-03" class="banner-slider"><img src="images/upload/slider-3.jpg" alt="Apple Pay">
                  <div class="main-banner left">
                    <div class="caption">
                      <h2>UOB Welcomes Apple Pay.<br>The new, easy way to pay.</h2>
                      <p data-tg-desktop="show">Get more with higher interest of up to 3.33% p.a.</p>
					  <a href="javascript:void(0);" title="Find out more" class="btn-1">Find out more</a>
                    </div>
                  </div>
                </li>
                <li id="slide-04" class="banner-slider"><img src="images/upload/slider-2.jpg" alt="Values are the bridge between generations">
                  <div class="main-banner middle">
                    <div class="caption"><a href="javascript:void(0);" title="Find out more" class="btn-1">Find out more </a>
                    </div>
                  </div>
                </li>
		-->
              </ul>
            <div id="bx-pager" class="bx-pager personal-tabs">
			<xsl:for-each select="Properties/Data/Result/Root/HeroBanner">
			<a class="hide-hash">
				<xsl:attribute name="data-slide-index">
					<xsl:value-of select="position()-1"/>
				</xsl:attribute>
				<xsl:attribute name="href">
					<xsl:text>#slide-0</xsl:text><xsl:value-of select="position()"/>
				</xsl:attribute>
				<span class="bx-pager-tabs"><xsl:value-of select="Banner_Label"/></span>
				</a>
			</xsl:for-each>
			<!--
			  <a data-slide-index="0" title="Apple Pay" href="#slide-01" class="hide-hash">
				<span class="bx-pager-tabs">Apple Pay</span>
				</a>
			  <a data-slide-index="1" title="UOB Personal Internet Banking" href="#slide-02" class="hide-hash">
				<span class="bx-pager-tabs">UOB Personal Internet Banking</span>
				</a>
			  <a data-slide-index="2" title="UOB PRVI Miles" href="#slide-03" class="hide-hash">
				<span class="bx-pager-tabs">UOB PRVI Miles</span>
				</a>
			  <a data-slide-index="3" title="UOB Deposit" href="#slide-04" class="hide-hash">
				<span class="bx-pager-tabs">UOB Deposit</span>
				</a>
			-->
			</div>
        </div>
   </div>

</div>
</xsl:template>
</xsl:stylesheet>
