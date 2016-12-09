 <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template name="segmentheader">
		<div id="toppage" class="wrapper"><a href="#skip" title="Skip To Main Content" class="skip-link">Skip To Main Content</a></div>
		<!-- Comment -->
		<header id="header">
			<xsl:variable name="groupType" select="/Properties/Data/Datum[@ID='D02']/Option[@Selected='true']/Value">
			</xsl:variable>
			<div role="banner" class="container">
				<div class="navbar-header">
					<button type="button" title="Menu" class="navbar-toggle off"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
					<h1 class="sr-only">UOB bank</h1>
					<div class="navbar-brand">
						<a href="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/target_link}" 
						title="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/hover_title}" 
						class="logo">
							<img 
							src="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/logo_image}" 
							data-uob-tg-mobile-src="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/logo_mobile_image}" 
							alt="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/bank_logo/hover_title}" />
						</a>
					</div>
					<div class="navbar-right">
						<div class="block-dropdowns">
							<div data-uob-tg-desktop="show" class="block-languages">
								<button id="dropdown-languages" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-focus">
									<xsl:attribute name="title">
										<xsl:value-of select="$groupType" />
									</xsl:attribute>
									<span data-uob-tg-mobile="show">UOB </span>
									<span class="text-bold"><xsl:value-of select="$groupType" /></span><span class="caret"></span>
								</button>
								<div aria-labelledby="dropdown-languages" class="dropdown-menu">
									<ul class="list-unstyled">
										<xsl:for-each select="/Properties/Data/Datum/DCR[@Type='globalheader']/root/country_selection">
											<!-- <xsl:if test="group_name != $groupType">
                      
										</xsl:if> -->
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
						<div data-uob-tg-mobile="hide" class="block-right">
							<span>
								<a href="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/right_logo/target_link}" 
								title="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/right_logo/hover_title}" class="logo">
									<img src="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/right_logo/logo_path}" 
									alt="{/Properties/Data/Datum/DCR[@Type='globalheader']/root/right_logo/hover_title}" />
								</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</header>
	</xsl:template>
</xsl:stylesheet>
