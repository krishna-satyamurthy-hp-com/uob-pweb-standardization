<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template name="horizontal-dropdown">
		<xsl:apply-templates select="/Properties/Data/Result"/>
		<div id="skip"></div>
	</xsl:template>
	<xsl:template match="Result">
		<xsl:apply-templates select="site-map/segment[@rule-name='Primary']/node[label='personal']" />
  </xsl:template>
	
	<xsl:template match="node[label='personal']">
		<xsl:apply-templates select="node[@visible-in-sitemap='true']"/>
	</xsl:template>
	
	<xsl:template match="node[@visible-in-sitemap='true']">
		<!-- Define pagetype variable -->
		<xsl:variable name="pageType" select="/Properties/Data/Datum[@ID='D02']/Option[@Selected='true']/Value">
		<!--	<xsl:value-of select="/Properties/Data/Datum[@ID='D01']/Option[@Selected='true']/Value" /> -->
		</xsl:variable>
		<xsl:variable name="countryType" select="/Properties/Data/Datum[@ID='D03']/Option[@Selected='true']/Value">
		<!--	<xsl:value-of select="/Properties/Data/Datum[@ID='D01']/Option[@Selected='true']/Value" /> -->
		</xsl:variable>
		
		<nav id="main-navbar" class="navbar-collapsed">
		<div data-uob-tg-tablet="show" class="nav-backdrop"></div>
			<div role="navigation">
				<ul role="tablist" class="mainnav">
					<xsl:call-template name="firstlevel"/>
				</ul>
					
				<div data-uob-tg-mobile="show" class="block-dropdowns">
					<div class="block-personal">
					  <button id="dropdown-personal" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-focus"><span data-uob-tg-mobile="hide">Your are in </span><span class="text-bold"> <xsl:value-of select="$pageType" /></span><span class="caret"></span></button>
					  <div aria-labelledby="dropdown-personal" class="dropdown-menu">
						<ul class="list-unstyled">
						 <!-- Start Loop for  Banking Sector-->
						<xsl:for-each select="/Properties/Data/Datum/DCR[@Type='globalheader']/root/banking_sector/sector_details">
						<xsl:if test="banking_sector_title != $pageType">
							<li>
								<a>
									<xsl:attribute name="title">
										<xsl:value-of select="banking_sector_title" />
									</xsl:attribute>
									<xsl:attribute name="href">
										<xsl:value-of select="target_link" />
									</xsl:attribute>
									<xsl:value-of select="banking_sector_title" />
								</a>
							</li>
							</xsl:if>
						</xsl:for-each>
						<!-- End of Loop for  Banking Sector-->
						</ul>
					  </div>
					</div>
					<div class="block-languages">
					  <button id="dropdown-languages" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-focus">
					  <xsl:attribute name="title">
						<xsl:value-of select="$countryType" />
					  </xsl:attribute>
					  <span data-uob-tg-mobile="show">UOB </span><span><xsl:value-of select="$countryType" /></span><span class="caret"></span></button>
					  <div aria-labelledby="dropdown-languages" class="dropdown-menu">
						<ul class="list-unstyled">
						<!-- Start Loop for  Countries-->
						<xsl:for-each select="/Properties/Data/Datum/DCR[@Type='globalheader']/root/country_selection">
						<xsl:if test="country_name != $countryType">
						  <li>
								<a>
									<xsl:attribute name="title">
										<xsl:value-of select="country_name" />
									</xsl:attribute>
									<xsl:attribute name="href">
										<xsl:value-of select="website_link" />
									</xsl:attribute>
									<xsl:value-of select="country_name" />
								</a>
							</li>
							</xsl:if>
						  </xsl:for-each>
						  <!-- End of Loop for Countries -->
						</ul>
					  </div>
					</div>
				</div>
			</div>
		</nav>
	</xsl:template>
	
	<xsl:template name="currentClassName"><xsl:if test="link/value != '' and starts-with(//Datum[@Name='iw-ls-page-name'],link/value)"><xsl:text>current </xsl:text></xsl:if></xsl:template>
	
	<xsl:template name="firstlevel">
		<xsl:choose>
			<xsl:when test="child::node[@visible-in-sitemap='true']">	
								
					<xsl:for-each select="child::node[@visible-in-sitemap='true']">	
						<xsl:choose>
							<xsl:when test="position()=1">
							<li>
								<xsl:attribute name="role"><xsl:text>tab</xsl:text></xsl:attribute>
								 <xsl:call-template name="nodeData">
								<xsl:with-param name="level">one</xsl:with-param>
								<xsl:with-param name="depthZero">zero</xsl:with-param>
							</xsl:call-template>
							<!--<div class="submenu-level1">
							<xsl:call-template name="secondlevel"/>
							</div>-->
								</li>
							</xsl:when>
							<xsl:otherwise>
							<li>
								<xsl:attribute name="role"><xsl:text>tab</xsl:text></xsl:attribute>
								<xsl:attribute name="class"><xsl:text>menu-level1</xsl:text></xsl:attribute>
								 <xsl:call-template name="nodeData">
								<xsl:with-param name="level">one</xsl:with-param>
							</xsl:call-template>
							<div class="submenu-level1">
							
								<xsl:variable name="depth">
										<xsl:choose>
												<xsl:when test="child::node[@visible-in-sitemap='true']">	
														<xsl:for-each select="child::node[@visible-in-sitemap='true']">
														<xsl:choose>
															<xsl:when test="child::node[@visible-in-sitemap='true']">		
																<xsl:for-each select="child::node[@visible-in-sitemap='true']">
																	<xsl:value-of select="count(node)" />	
																</xsl:for-each>
															</xsl:when>
														</xsl:choose>
														</xsl:for-each>
												</xsl:when>
										</xsl:choose>
								</xsl:variable>

							<ul>
							<xsl:choose>
							<xsl:when test="$depth>0">
								<xsl:attribute name="class"><xsl:text>hasfoursub</xsl:text></xsl:attribute>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="class"><xsl:text>sub2 hasfoursub</xsl:text></xsl:attribute>
							</xsl:otherwise>		
							</xsl:choose>
							<xsl:call-template name="secondlevel"/>
							</ul>
							</div>
							</li>									
							</xsl:otherwise>
						</xsl:choose>	
						
						   

							
					</xsl:for-each>
				
			</xsl:when>
			<xsl:otherwise>
				<!--<xsl:call-template name="nodeData"/>-->
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="secondlevel">
		<xsl:choose>
			<xsl:when test="child::node[@visible-in-sitemap='true']">	
			<xsl:variable name="array" as="element()*">
					<xsl:for-each select="child::node[@visible-in-sitemap='true']">
						<xsl:variable name="depth2level"><xsl:value-of select="count(node)" /></xsl:variable>

						<xsl:choose>
								<xsl:when test="$depth2level>0">
									<Item><xsl:value-of select="position()"/> </Item>
								</xsl:when>
								<xsl:otherwise>	
								</xsl:otherwise>
						</xsl:choose>

						</xsl:for-each>
					</xsl:variable>
					<xsl:for-each select="child::node[@visible-in-sitemap='true']">

						<xsl:variable name="depth2level"><xsl:value-of select="count(node)" /></xsl:variable>
						
						
						<xsl:variable name="count"><xsl:value-of select="count(node)" /></xsl:variable>
						<xsl:variable name="depthpos"><xsl:value-of select="position()" /></xsl:variable>
					
								<li>
									<xsl:choose>
									<xsl:when test="$depth2level=0">
												<xsl:attribute name="class"><xsl:text>menu-level2 nosub</xsl:text></xsl:attribute>
									</xsl:when>
									<xsl:when test="position()=$array[1]">
										<xsl:attribute name="class"><xsl:text>menu-level2 open first</xsl:text></xsl:attribute>
									</xsl:when>
									<xsl:otherwise>	
									<xsl:attribute name="class"><xsl:text>menu-level2</xsl:text></xsl:attribute>
									</xsl:otherwise>
									</xsl:choose>
									<xsl:choose>
										<xsl:when test="$depth2level=0">
											<xsl:call-template name="nodeData">
												<xsl:with-param name="level">two</xsl:with-param>
												<xsl:with-param name="depthZero">zero</xsl:with-param>
											</xsl:call-template>
											<xsl:call-template name="thirdlevel"/>
										</xsl:when>
										
										<xsl:otherwise>	
											<xsl:call-template name="nodeData">
												<xsl:with-param name="level">two</xsl:with-param>
												<xsl:with-param name="depthZero">xyzzero</xsl:with-param>
											</xsl:call-template>
											<xsl:call-template name="thirdlevel"/>
										</xsl:otherwise>		
									</xsl:choose>
								</li>
						
					</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<!--<xsl:call-template name="nodeData"/>-->
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	
	
	<xsl:template name="thirdlevel">
		<xsl:variable name="parlabel"><xsl:value-of select="../label" /></xsl:variable>	
		<xsl:choose>
		
			<xsl:when test="child::node[@visible-in-sitemap='true']">
			

				<div class="submenu-level2">
				<div>
				<xsl:choose>
				  <xsl:when test="count(child::node[@visible-in-sitemap='true']/child::node[@visible-in-sitemap='true']) &gt; 0 ">
					<xsl:attribute name="class"><xsl:text>nav-content card-content</xsl:text></xsl:attribute>
					</xsl:when>
					<xsl:otherwise>
					<xsl:attribute name="class"><xsl:text>nav-content</xsl:text></xsl:attribute>
					</xsl:otherwise>
				</xsl:choose>
				<xsl:for-each select="child::node[@visible-in-sitemap='true']">
				<xsl:variable name="currentdep"><xsl:value-of select="position()" /></xsl:variable>
				<xsl:variable name="dep"><xsl:value-of select="position()+1" /></xsl:variable>
				<xsl:choose>
				<xsl:when test="child::node[@visible-in-sitemap='true']">
				<!--<xsl:if test="(position() mod 2) != 0">
					
					<xsl:choose>
						<xsl:when test="child::node[@visible-in-sitemap='true']">
						
							<div class="col">
							<h2>
								<xsl:value-of select="label[$currentdep]"/>
							</h2>
							<xsl:call-template name="fourthlevel"/>
						 </div>

						<div class="col">
							<h2>
							<xsl:value-of select="following-sibling::*[1]/label" />
							</h2>
							<xsl:if test="child::node[@visible-in-sitemap='true']">
								<xsl:call-template name="siblingfourthlevel">
								<xsl:with-param name="siblingNode">following-sibling::*[1]</xsl:with-param>
								</xsl:call-template>
							</xsl:if>
						 </div>
						 
						</xsl:when>
						<xsl:otherwise></xsl:otherwise>
					</xsl:choose>
				
				</xsl:if>-->
				
				<div class="col">
							<h2>
								<xsl:value-of select="label[$currentdep]"/>
							</h2>
							<xsl:call-template name="fourthlevel"/>
						 </div>
				</xsl:when>
				<xsl:otherwise>
				<ul class="list-unstyled">
								<li>
									<xsl:call-template name="nodeData">
										<xsl:with-param name="level">three</xsl:with-param>
									</xsl:call-template>
								</li>
				</ul>
				</xsl:otherwise>
				</xsl:choose>
				</xsl:for-each>
				
				
				</div>
				  <div data-uob-tg-mobile="hide" class="side-bar">	
					<xsl:if test= "$parlabel = (/Properties/Data/Datum[@Name='quicklinks']/DCR[@Type='quicklinks']/quick_links/type/@type_name)">
					<div class="block quick-link">
					<h2>Quick Links</h2>
						<xsl:for-each select = "/Properties/Data/Datum[@Name='quicklinks']/DCR[@Type='quicklinks']/quick_links/type[@type_name=$parlabel]/links">
						<ul class="list-unstyled">
							<li><a>
								<xsl:attribute name="title">
									<xsl:value-of select="link_name" />
								</xsl:attribute>
								<xsl:attribute name="href">
									<xsl:value-of select="link_ref" />
								</xsl:attribute>
								<xsl:value-of select="link_name" />
							</a></li>
						</ul>	
						</xsl:for-each>
						</div>
						</xsl:if>
						<div class="block need-help">
					  <xsl:for-each select="/Properties/Data/Datum[@Name='quicklinks']/DCR[@Type='quicklinks']/quick_links/type[@type_name=$parlabel]/need_help">
					  	<xsl:if test="phone != '' or email != '' " >
					  		<h2>Need help</h2>
						  	<ul class="list-unstyled">
						  	<xsl:if test="phone != ''" >
							  	<li>
								  	<a>
								  		<xsl:attribute name="title">
								  			<xsl:value-of select="phone" />
								  		</xsl:attribute>
								  		<xsl:attribute name="href">
								  			<xsl:value-of select="phone_href" />
								  		</xsl:attribute>
								  		<span class="fa fa-phone"></span>
								  		<span>
								  			<xsl:value-of select="phone" />
								  		</span>
								  	</a>
								  </li>
								</xsl:if>
							  <xsl:if test="email != ''" >
								  <li>
								  	<a>
								  		<xsl:attribute name="title">
								  			<xsl:value-of select="email" />
								  		</xsl:attribute>
								  		<xsl:attribute name="href">
								  			<xsl:value-of select="email_href" />
								  		</xsl:attribute>
								  		<span class="fa fa-envelope-o"></span>
								  		<xsl:value-of select="email" />
								  	</a>
								  </li>
								</xsl:if>
								</ul>
							</xsl:if>
						</xsl:for-each>
				  </div>
				  <xsl:if test= "$parlabel = (/Properties/Data/Datum[@Name='quicklinks']/DCR[@Type='quicklinks']/quick_links/type/@type_name)">
				  <xsl:if test= "0 != /Properties/Data/Datum[@Name='quicklinks']/DCR[@Type='quicklinks']/quick_links/type[@type_name=$parlabel]/img_ref">
				  <div class="thumb">
						<a>
							<xsl:attribute name="href"><xsl:value-of select="/Properties/Data/Datum[@Name='quicklinks']/DCR[@Type='quicklinks']/quick_links/type[@type_name=$parlabel]/img_target_link"/>
							</xsl:attribute>
							<xsl:attribute name="title"><xsl:value-of select="/Properties/Data/Datum[@Name='quicklinks']/DCR[@Type='quicklinks']/quick_links/type[@type_name=$parlabel]/img_title"/>
							</xsl:attribute>
							<img>
								<xsl:attribute name="src"><xsl:value-of select="/Properties/Data/Datum[@Name='quicklinks']/DCR[@Type='quicklinks']/quick_links/type[@type_name=$parlabel]/img_ref"/>
								</xsl:attribute>
								
								<xsl:attribute name="alt"><xsl:value-of select="/Properties/Data/Datum[@Name='quicklinks']/DCR[@Type='quicklinks']/quick_links/type[@type_name=$parlabel]/img_text"/>
								</xsl:attribute>
							</img>
						</a>
						</div>
						</xsl:if>
						</xsl:if>
				  </div>
				  
				  
				</div>
			</xsl:when>
			<xsl:otherwise>
				<!--<xsl:call-template name="nodeData"/>-->
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="fourthlevel">
		<xsl:param name="siblingNode"/>
		<xsl:choose>
		
			<xsl:when test="child::node[@visible-in-sitemap='true']">			 
				<xsl:for-each select="child::node[@visible-in-sitemap='true']">
					<ul class="list-unstyled">
						<li>
							<xsl:call-template name="nodeData">
								<xsl:with-param name="level">four</xsl:with-param>
							</xsl:call-template>
						</li>
					</ul>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<!--<xsl:call-template name="nodeData"/>-->
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	<xsl:template name="siblingfourthlevel">
		<xsl:param name="siblingNode"/>
		<xsl:choose>
		
			<xsl:when test="child::node[@visible-in-sitemap='true']">			 
				<xsl:for-each select="following-sibling::*[1]/node">
					<ul class="list-unstyled">
						<li>
							<xsl:call-template name="nodeData">
								<xsl:with-param name="level">four</xsl:with-param>
							</xsl:call-template>
						</li>
					</ul>
				</xsl:for-each>
			</xsl:when>
			<xsl:otherwise>
				<!--<xsl:call-template name="nodeData"/>-->
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	
	
	<xsl:template name="nodeData">
		<xsl:param name="level"/>
		<xsl:param name="depthZero"/>
		<!--parent 1: <xsl:value-of select="./parent::current()/@label"/>
			parent 2: <xsl:value-of select="./parent::node()/@label"/>-->
			<xsl:variable name="parentlabel" select="parent::*/label"/>
				
		<xsl:choose>
			<xsl:when test="link/@type = 'page'">
				<xsl:if test="link/popup">
					<xsl:if test="$level = 'one' or $level ='two'">
					<xsl:if test="$depthZero !='zero'">
					<a href="#">
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>lv1</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>lv2</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<!--<xsl:attribute name="onclick">window.open('$PAGE_LINK[<xsl:value-of select="link/value"/>]<xsl:text/><xsl:call-template name="queryString"><xsl:with-param name="queryParams" select="link/query-string/parameter"/></xsl:call-template>', '<xsl:value-of select="link/popup/targetWindowName"/>', '<xsl:value-of select="link/popup/windowFeatures"/>')
						</xsl:attribute>-->
					</a></xsl:if></xsl:if>
					<a href="#">
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:attribute name="onclick">window.open('$PAGE_LINK[<xsl:value-of select="link/value"/>]<xsl:text/><xsl:call-template name="queryString"><xsl:with-param name="queryParams" select="link/query-string/parameter"/></xsl:call-template>', '<xsl:value-of select="link/popup/targetWindowName"/>', '<xsl:value-of select="link/popup/windowFeatures"/>')
						</xsl:attribute>						
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>sublink1</xsl:text></xsl:attribute>
							<span data-uob-tg-mobile="show">Back to Main</span>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>sublink2</xsl:text></xsl:attribute>
							<span data-uob-tg-mobile="show">Back to <xsl:value-of select="$parentlabel"/></span>
						</xsl:if>
					    <!--<xsl:attribute name="data-uob-tg-mobile"><xsl:text>hide</xsl:text></xsl:attribute>-->
							
						<xsl:value-of select="label"/>
					</a>
				</xsl:if>
				<xsl:if test="not(link/popup)">
					<xsl:if test="$level = 'one' or $level ='two'">
					<xsl:if test="$depthZero !='zero'">
					<a href="#">
						<!--<xsl:attribute name="href">$PAGE_LINK[<xsl:value-of select="link/value"/>]<xsl:text/><xsl:call-template name="queryString"><xsl:with-param name="queryParams" select="link/query-string/parameter"/></xsl:call-template></xsl:attribute>-->
						<xsl:attribute name="target"><xsl:value-of select="link/@target"/></xsl:attribute>
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>lv1</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>lv2</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						
					</a></xsl:if></xsl:if>				
					<a>
						<xsl:attribute name="href">$PAGE_LINK[<xsl:value-of select="link/value"/>]<xsl:text/><xsl:call-template name="queryString"><xsl:with-param name="queryParams" select="link/query-string/parameter"/></xsl:call-template></xsl:attribute>
						<xsl:attribute name="target"><xsl:value-of select="link/@target"/></xsl:attribute>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>sublink1</xsl:text></xsl:attribute>
							<span data-uob-tg-mobile="show">Back to Main</span>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>sublink2</xsl:text></xsl:attribute>
							<span data-uob-tg-mobile="show">Back to <xsl:value-of select="$parentlabel"/></span>
						</xsl:if>
						
					    <!--<xsl:attribute name="data-uob-tg-mobile"><xsl:text>hide</xsl:text></xsl:attribute>-->
						<xsl:value-of select="label"/>
					</a>

				</xsl:if>
			</xsl:when>
			<xsl:when test="link/@type ='url'">
				<xsl:if test="link/popup">
					<xsl:if test="$level = 'one' or $level ='two'">
					<xsl:if test="$depthZero !='zero'">
					<a href="#">
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>lv1</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>lv2</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<!--<xsl:attribute name="onclick">window.open('<xsl:value-of select="link/value"/><xsl:text/><xsl:call-template name="queryString"><xsl:with-param name="queryParams" select="link/query-string/parameter"/></xsl:call-template>', '<xsl:value-of select="link/popup/targetWindowName"/>', '<xsl:value-of select="link/popup/windowFeatures"/>')
						</xsl:attribute>-->
					</a></xsl:if></xsl:if>			
					<a href="#">
						<xsl:attribute name="onclick">window.open('<xsl:value-of select="link/value"/><xsl:text/><xsl:call-template name="queryString"><xsl:with-param name="queryParams" select="link/query-string/parameter"/></xsl:call-template>', '<xsl:value-of select="link/popup/targetWindowName"/>', '<xsl:value-of select="link/popup/windowFeatures"/>')
						</xsl:attribute>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>sublink1</xsl:text></xsl:attribute>
							<span data-uob-tg-mobile="show">Back to Main</span>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>sublink2</xsl:text></xsl:attribute>
							<span data-uob-tg-mobile="show">Back to <xsl:value-of select="$parentlabel"/></span>
						</xsl:if>
						<!--<xsl:attribute name="data-uob-tg-mobile"><xsl:text>hide</xsl:text></xsl:attribute>-->
						<xsl:value-of select="label"/>
					</a>
				</xsl:if>
				<xsl:if test="not(link/popup)">
					<xsl:if test="$level = 'one' or $level ='two'">
					<xsl:if test="$depthZero !='zero'">
					<a href="#">
						<!--<xsl:attribute name="href"><xsl:value-of select="link/value"/><xsl:call-template name="queryString"><xsl:with-param name="queryParams" select="link/query-string/parameter"/></xsl:call-template></xsl:attribute>-->
						<xsl:attribute name="target"><xsl:value-of select="link/@target"/></xsl:attribute>
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>lv1</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>lv2</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
					</a></xsl:if></xsl:if>				
					<a>
						<xsl:attribute name="href"><xsl:value-of select="link/value"/><xsl:call-template name="queryString"><xsl:with-param name="queryParams" select="link/query-string/parameter"/></xsl:call-template></xsl:attribute>
						<xsl:attribute name="target"><xsl:value-of select="link/@target"/></xsl:attribute>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>sublink1</xsl:text></xsl:attribute>
							<span data-uob-tg-mobile="show">Back to Main</span>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>sublink2</xsl:text></xsl:attribute>
							<span data-uob-tg-mobile="show">Back to <xsl:value-of select="$parentlabel"/></span>
						</xsl:if>
						<!--<xsl:attribute name="data-uob-tg-mobile"><xsl:text>hide</xsl:text></xsl:attribute>-->
						<xsl:value-of select="label"/>
					</a>
					<xsl:if test="$level = 'one'">
					</xsl:if>
				</xsl:if>
			</xsl:when>
			<xsl:when test="link/@type = 'none'">
				<xsl:choose>
					<xsl:when test="child::node[@visible-in-sitemap='true']">
					<xsl:if test="$level = 'one' or $level ='two'">
					<xsl:if test="$depthZero !='zero'">
					<a href="#">
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>lv1</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>lv2</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
					</a>
					</xsl:if></xsl:if>					
						<a>
							<xsl:if test="$level = 'four'">
								<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							</xsl:if>
							<xsl:if test="$level = 'one'">
								<xsl:attribute name="class"><xsl:text>sublink1</xsl:text></xsl:attribute>
								<span data-uob-tg-mobile="show">Back to Main</span>
							</xsl:if>
							<xsl:if test="$level = 'two'">
								<xsl:attribute name="class"><xsl:text>sublink2</xsl:text></xsl:attribute>
								<span data-uob-tg-mobile="show">Back to <xsl:value-of select="$parentlabel"/></span>
							</xsl:if>
							<!--<xsl:attribute name="data-uob-tg-mobile"><xsl:text>hide</xsl:text></xsl:attribute>-->
							<xsl:value-of select="label"/>
						</a>
					</xsl:when>
					<xsl:otherwise>
					<xsl:if test="$level = 'one' or $level ='two'">
					<xsl:if test="$depthZero !='zero'">
					<a href="#">
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>lv1</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>lv2</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
					</a>		
					</xsl:if></xsl:if>					
						<a>
							<xsl:if test="$level = 'four'">
								<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							</xsl:if>
							<xsl:if test="$level = 'one'">
								<xsl:attribute name="class"><xsl:text>sublink1</xsl:text></xsl:attribute>
								<span data-uob-tg-mobile="show">Back to Main</span>
							</xsl:if>
							<xsl:if test="$level = 'two'">
								<xsl:attribute name="class"><xsl:text>sublink2</xsl:text></xsl:attribute>
								<span data-uob-tg-mobile="show">Back to <xsl:value-of select="$parentlabel"/></span>
							</xsl:if>
							<!--<xsl:attribute name="data-uob-tg-mobile"><xsl:text>hide</xsl:text></xsl:attribute>-->
							<xsl:value-of select="label"/>
						</a>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<xsl:choose>
					<xsl:when test="child::node[@visible-in-sitemap='true']">
					<xsl:if test="$level = 'one' or $level ='two'">
					<xsl:if test="$depthZero !='zero'">
					<a href="#">
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>lv1</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>lv2</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
					</a>	
					</xsl:if></xsl:if>					
						<a>
							<xsl:if test="$level = 'four'">
								<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							</xsl:if>
							<xsl:if test="$level = 'one'">
								<xsl:attribute name="class"><xsl:text>sublink1</xsl:text></xsl:attribute>
								<span data-uob-tg-mobile="show">Back to Main</span>
							</xsl:if>
							<xsl:if test="$level = 'two'">
								<xsl:attribute name="class"><xsl:text>sublink2</xsl:text></xsl:attribute>
								<span data-uob-tg-mobile="show">Back to <xsl:value-of select="$parentlabel"/></span>
							</xsl:if>
							<xsl:value-of select="label"/>
						</a>
					</xsl:when>
					<xsl:otherwise>
					<xsl:if test="$level = 'one' or $level ='two'">
					<xsl:if test="$depthZero !='zero'">
					<a href="#">
						<xsl:if test="$level = 'one'">
							<xsl:attribute name="class"><xsl:text>lv1</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'two'">
							<xsl:attribute name="class"><xsl:text>lv2</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
						<xsl:if test="$level = 'four'">
							<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							<xsl:attribute name="data-uob-tg-mobile"><xsl:text>show</xsl:text></xsl:attribute>
							<xsl:attribute name="title"><xsl:text>Sub navigation</xsl:text></xsl:attribute>
						</xsl:if>
					</a>
					</xsl:if></xsl:if>
						<a>
							<xsl:if test="$level = 'four'">
								<xsl:attribute name="class"><xsl:text>tertiaryLabel</xsl:text></xsl:attribute>
							</xsl:if>
							<xsl:if test="$level = 'one'">
								<xsl:attribute name="class"><xsl:text>sublink1</xsl:text></xsl:attribute>
								<span data-uob-tg-mobile="show">Back to Main</span>
							</xsl:if>
							<xsl:if test="$level = 'two'">
								<xsl:attribute name="class"><xsl:text>sublink2</xsl:text></xsl:attribute>
								<span data-uob-tg-mobile="show">Back to <xsl:value-of select="$parentlabel"/></span>
							</xsl:if>
							<xsl:value-of select="label"/>
						</a>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<xsl:template name="queryString">
		<!-- need to encode the values either here or in the java class -->
		<xsl:param name="queryParams"/>
		<xsl:for-each select="$queryParams">
			<xsl:value-of select="name"/>=<xsl:value-of select="value"/>
			<xsl:if test="position() &lt; count($queryParams)">&amp;</xsl:if>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>