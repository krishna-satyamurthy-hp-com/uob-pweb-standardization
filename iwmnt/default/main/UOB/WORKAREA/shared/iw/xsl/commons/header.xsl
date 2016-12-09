 <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="globalheader">
<div id="toppage" class="wrapper"><a href="#skip" title="Skip To Main Content" class="skip-link">Skip To Main Content</a></div>
 <!-- Comment -->
 <header id="header">
 <!-- Define pagetype variable -->
		<xsl:variable name="pageType" select="/Properties/Data/Datum[@ID='D01']/Option[@Selected='true']/Value">
	<!--	<xsl:value-of select="/Properties/Data/Datum[@ID='D01']/Option[@Selected='true']/Value" /> -->
		</xsl:variable>
				<xsl:variable name="countryType" select="/Properties/Data/Datum[@ID='D02']/Option[@Selected='true']/Value">
	<!--	<xsl:value-of select="/Properties/Data/Datum[@ID='D01']/Option[@Selected='true']/Value" /> -->
		</xsl:variable>

        <div role="banner" class="container">
          <div class="navbar-header">
            <button type="button" title="Menu" class="navbar-toggle off"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
            <h1 class="sr-only">UOB bank</h1>
            <div class="navbar-brand">
                <a href="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/target_link}" title="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/hover_title}" class="logo">
                    <img src="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/logo_image}" data-uob-tg-mobile-src="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/logo_mobile_image}" alt="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/hover_title}" />
                </a>
            </div>
            <div class="navbar-right">
              <div class="block-dropdowns">
                <div data-uob-tg-desktop="show" class="block-personal">
                  <button id="dropdown-personal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-focus"><span data-uob-tg-mobile="hide">Your are in </span><span class="text-bold"> <xsl:value-of select="$pageType" /></span><span class="caret"></span></button>
                  <div aria-labelledby="dropdown-personal" class="dropdown-menu">
                    <ul class="list-unstyled">
					 <!-- Start Loop for  Banking Sector-->
					<xsl:for-each select="/Properties/Data/Datum/DCR[@Type='globalheader']/root/banking_sector/sector_details">
					<xsl:if test="banking_sector_title != $pageType">
						<li class="dropdown-item-heading">
							<!-- <a>
								<xsl:attribute name="title">
									<xsl:value-of select="banking_sector_title" />
								</xsl:attribute>
								<xsl:attribute name="href">
									<xsl:value-of select="target_link" />
								</xsl:attribute>
								<xsl:value-of select="banking_sector_title" />
							</a> -->
							<xsl:value-of select="banking_sector_title" />
						</li>
						<xsl:for-each select="sub_sector_details">
							<li>
								<a>
									<xsl:attribute name="title">
										<xsl:value-of select="banking_sub_sector_title" />
									</xsl:attribute>
									<xsl:attribute name="href">
										<xsl:value-of select="target_link" />
									</xsl:attribute>
									<xsl:value-of select="banking_sub_sector_title" />
								</a>
							</li>
						</xsl:for-each>
					</xsl:if>
                    </xsl:for-each>
					<!-- End of Loop for  Banking Sector-->
					</ul>
                  </div>
                </div>
                <div data-uob-tg-desktop="show" class="block-languages">
                  <button id="dropdown-languages" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-focus">
				  <xsl:attribute name="title">
					<xsl:value-of select="$countryType" />
				  </xsl:attribute>
				  <span data-uob-tg-mobile="show">UOB </span>
				  <span class="text-bold"><xsl:value-of select="$countryType" /></span><span class="caret"></span></button>
                  <div aria-labelledby="dropdown-languages" class="dropdown-menu">
                    <ul class="list-unstyled">
					<!-- Start Loop for  Countries-->
					<xsl:for-each select="/Properties/Data/Datum/DCR[@Type='globalheader']/root/country_selection">
					<xsl:if test="country_name != $countryType">
                      <li>
							<a>
								<xsl:attribute name="title">
									<xsl:value-of select="concat('UOB ', country_name)" />
								</xsl:attribute>
								<xsl:attribute name="href">
									<xsl:value-of select="website_link" />
								</xsl:attribute>
								<xsl:value-of select="concat('UOB ', country_name)" />
							</a>
						</li>
						</xsl:if>
					  </xsl:for-each>
					  <!-- End of Loop for Countries -->
                    </ul>
                  </div>
                </div>
				 <div class="block-login">
                  <button id="dropdown-login" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Login" class="btn-focus"><span data-uob-tg-mobile="hide" class="text-bold"><xsl:value-of select="/Properties/Data/Datum/DCR[@Type='globalheader']/root/banking_section/login_label"/></span><span class="icon icon-lock"></span></button>
                  <div aria-labelledby="dropdown-login" class="dropdown-menu">
                    <ul class="list-unstyled">
											<xsl:for-each select="/Properties/Data/Datum/DCR[@Type='globalheader']/root/banking_section/section_details">
					              <li>
												<a>
														<xsl:attribute name="title">
															<xsl:value-of select="section_title" />
														</xsl:attribute>
														<xsl:attribute name="href">
															<xsl:value-of select="target_link" />
														</xsl:attribute>
														<xsl:value-of select="section_title" />
													</a>
												</li>
											</xsl:for-each>
                    </ul>
                  </div>
                </div>
              </div>
             <!-- <div role="search" class="navbar-form">
                <div class="dropdown">
                  <button id="toggle-search" type="button" aria-haspopup="true" aria-expanded="false" title="Search" class="btn-focus"><span class="fa fa-search"></span></button>
                  <div aria-labelledby="btn-search" class="dropdown-menu">
                    <form id="frm-search" method="post">
                      <input id="txt-search" name="txt-search" title="Search" type="text" placeholder="Search" class="txt-search" />
                      <button id="btn-search" type="button" title="Search"><span class="fa fa-search"></span></button>
                    </form>
                  </div>
                </div>
              </div> 
              <div class="block-login"><a title="Login" href="javascript:void(0);"><span>Login</span><span class="icon icon-lock"></span></a></div> -->
			  
			 
				
              <div data-uob-tg-mobile="hide" class="block-right">
			  <span>
				<a href="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/right_logo/target_link}" title="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/right_logo/hover_title}" class="logo">
                    <img src="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/right_logo/logo_path}" alt="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/right_logo/hover_title}" />
                </a>
			  </span>

			  </div>
            </div>
          </div>
        </div>


      </header>
</xsl:template>
</xsl:stylesheet>
