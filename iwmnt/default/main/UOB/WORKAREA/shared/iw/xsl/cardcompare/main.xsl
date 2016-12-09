<!--<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0" xmlns:xs="http://www.w3.org/2001/XMLSchema" >

	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/cardcompare/cards-utility-links.xsl"/>-->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:include href="http://www.interwoven.com/custom/iw/xsl/cardcompare/cards-utility-links.xsl"/>
	<xsl:template name="cardcompare">

		<!--
	<xsl:value-of select="/Properties/Data/Result/contentRoot/category/@name" />
		<xsl:apply-templates select="/Properties/Data/Result/contentRoot"/>

	</xsl:template>

	<xsl:template name="contentRoot">
	
		<xsl:variable name="vAllowedSymbols" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'"/>
		
		
		<xsl:variable name="lowercase-texts">
			<xsl:call-template name="to-lowercase">
				<xsl:with-param name="string" select="category/@name"/>
			</xsl:call-template>
		</xsl:variable>
		-->

		<xsl:variable name="vAllowedSymbols" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'"/>

		<xsl:variable name="lowercase-texts">
			<xsl:call-template name="to-lowercase">
				<xsl:with-param name="string" select="/Properties/Data/Result/contentRoot/*[1]/@name"/>
			</xsl:call-template>
		</xsl:variable>

		<div class="container">
			<div class="row sticky-wrapper">
				<div class="sticky-nav cards-compare" id="cardfilter" data-uob-tg-mobile="hide">

					<!-- TabList Display Here -->
					<ul role="tablist" class="nav nav-tabs nav-justified">

						<xsl:for-each select="/Properties/Data/Result/contentRoot/category">


							<xsl:variable name="lowercase-text">
								<xsl:call-template name="to-lowercase">
									<xsl:with-param name="string" select="@name"/>
								</xsl:call-template>
							</xsl:variable>
							<li>
								<xsl:if test="position()= 1">
									<xsl:attribute name="class">									
										<xsl:text>active</xsl:text>									
									</xsl:attribute>
								</xsl:if>
								<a>
									<xsl:attribute name="title">									
										<xsl:value-of select="@name" />
									</xsl:attribute>
									<xsl:attribute name="href">									
										<xsl:text>#</xsl:text><xsl:value-of select="translate($lowercase-text,translate($lowercase-text,$vAllowedSymbols, ''),'')" />
									</xsl:attribute>
									<xsl:attribute name="data-toggle">									
										<xsl:text>tab</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="role">									
										<xsl:text>tab</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="aria-selected">
										<xsl:if test="position()= 1">
											<xsl:text>true</xsl:text>
										</xsl:if>
										<xsl:if test="position()!= 1">
											<xsl:text>false</xsl:text>
										</xsl:if>
									</xsl:attribute>
									<xsl:attribute name="aria-controls">									
										<xsl:value-of select="translate($lowercase-text,translate($lowercase-text,$vAllowedSymbols, ''),'')" />
									</xsl:attribute>
									<xsl:value-of select="@name" />
								</a>
							</li>
						</xsl:for-each>	
						<li class="button-compare-tab"><a id="compare-card-action" class="button-compare"><img src="../../../../iwov-resources/images/card-compare-landing/icon-button-compare.png" alt="icon compare"/><span>Compare Cards</span><span class="count">0/4</span></a></li>
					</ul>
				</div>

				<div data-uob-tg-mobile="show" class="filter-cards filter-content-block pusher-t-30">
					<div class="dropdown-filter-group">
						<div class="dropdown">

							<button id="cardFilter" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  class="btn-dropdown btn-dropdown-select">
								<xsl:attribute name="data-uob-tab-card">
									<xsl:text>#</xsl:text><xsl:value-of select="translate($lowercase-texts,translate($lowercase-texts,$vAllowedSymbols, ''),'')" />
								</xsl:attribute>
								<span class="text-bold">
									<xsl:value-of select="/Properties/Data/Result/contentRoot/*[1]/@name" />
								</span>
								<span class="caret"></span>
							</button>
							<div aria-labelledby="cardFilter" class="dropdown-menu dropdown-select">
								<ul class="list-unstyled">
									<xsl:for-each select="/Properties/Data/Result/contentRoot/category">

										<xsl:variable name="lowercase-text">
											<xsl:call-template name="to-lowercase">
												<xsl:with-param name="string" select="@name"/>
											</xsl:call-template>
										</xsl:variable>

										<li>
											<xsl:attribute name="data-uob-tab-card">									
												<xsl:text>#</xsl:text><xsl:value-of select="translate($lowercase-text,translate($lowercase-text,$vAllowedSymbols, ''),'')" />
											</xsl:attribute>
											<xsl:value-of select="@name" />
										</li>

									</xsl:for-each>
								</ul>
							</div>
						</div>
					</div>
				</div>


				<!-- *******************************Cards display ***************************-->	
				<div class="tab-content compare-cards">
					<xsl:for-each select="/Properties/Data/Result/contentRoot/category">

						<xsl:variable name="lowercase-text">
							<xsl:call-template name="to-lowercase">
								<xsl:with-param name="string" select="@name"/>
							</xsl:call-template>
						</xsl:variable>

						<xsl:variable name="top" select="position()"/>
						<div>
							<xsl:attribute name="id">
								<xsl:value-of select="translate($lowercase-text,translate($lowercase-text,$vAllowedSymbols, ''),'')" />
							</xsl:attribute>
							<xsl:attribute name="role">
								<xsl:text>tabpanel</xsl:text>
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>tab-pane </xsl:text>
								<xsl:if test="position()=1">
									<xsl:text>active</xsl:text>
								</xsl:if>
							</xsl:attribute>


							<div class="cards-list">
								<div class="compare-cards-list">
									<div class="sticky-nav tabs-card-type" data-uob-tg-mobile="show">
										<ul role="tablist" class="nav-heading list-unstyled">
											<li class="active">
												<a title="Credit cards" data-toggle="tab" role="tab" aria-selected="true" >
													<xsl:attribute name="href">
														<xsl:text>#CreditCards-</xsl:text><xsl:value-of select="$top"/>
													</xsl:attribute>
													<xsl:attribute name="aria-controls">
														<xsl:text>#CreditCards-</xsl:text><xsl:value-of select="$top"/>
													</xsl:attribute>
													Credit cards
												</a>
											</li>
											<li>
												<a title="Debit cards" data-toggle="tab" role="tab" aria-selected="false" >
													<xsl:attribute name="href">
														<xsl:text>#DebitCards-</xsl:text><xsl:value-of select="$top"/>
													</xsl:attribute>
													<xsl:attribute name="aria-controls">
														<xsl:text>#DebitCards-</xsl:text><xsl:value-of select="$top"/>
													</xsl:attribute>
													Debit cards
												</a>
											</li>
										</ul>
									</div>
									<div class="tab-content">
										<!-- Credit cards display -->


										<xsl:if test="credit_card">
											<div>
												<xsl:attribute name="id">
													<xsl:text>CreditCards-</xsl:text><xsl:value-of select="$top"/>
												</xsl:attribute>
												<xsl:attribute name="role">
													<xsl:text>tabpanel</xsl:text>
												</xsl:attribute>
												<xsl:attribute name="class">
													<xsl:text>tab-pane fade in active</xsl:text>
												</xsl:attribute>

												<h2 class="heading2">Credit cards-<xsl:value-of select="$top"/></h2>																								
												<div class="row card-row">


													<!-- Credit cards display starts here -->
													<xsl:variable name="value" select="credit_card" />
													<xsl:call-template name="cardsload">
														<xsl:with-param name="nodeName" select="$value"/>
														<xsl:with-param name="position" select="concat($top,'1')"/>
													</xsl:call-template>

												</div>

												<div data-uob-tg-mobile="show" class="view-more-cards text-center"><a href="javascript:void(0);" title="View More Cards" class="btn-1 view-more-cards-btn">View More Cards</a></div>
											</div>
										</xsl:if>

										<xsl:if test="debit_card">
											<div >
												<xsl:attribute name="id">
													<xsl:text>DebitCards-</xsl:text><xsl:value-of select="$top"/>
												</xsl:attribute>
												<xsl:attribute name="role">
													<xsl:text>tabpanel</xsl:text>
												</xsl:attribute>
												<xsl:attribute name="class">
													<xsl:text>tab-pane fade </xsl:text>
												</xsl:attribute>

												<h2 class="heading2">Debit cards-<xsl:value-of select="$top"/></h2>																								
												<div class="row card-row">

													<xsl:variable name="value" select="debit_card" />
													<xsl:call-template name="cardsload">
														<xsl:with-param name="nodeName" select="$value"/>
														<xsl:with-param name="position" select="concat($top,'2')"/>
													</xsl:call-template>
													<!-- Debit cards display starts here -->

												</div>

												<div data-uob-tg-mobile="show" class="view-more-cards text-center"><a href="javascript:void(0);" title="View More Cards" class="btn-1 view-more-cards-btn">View More Cards</a></div>
											</div>
										</xsl:if>

										<!-- Debit cards display ends here -->
									</div>
								</div>
							</div>
						</div>

					</xsl:for-each>
					<!-- ****************************************Cards display ends ***************************-->	

				</div>
				<div data-uob-tg-mobile="show" class="button-compare-tab compare-button-mobile">
					<ul class="list-unstyled list-compare-card">
						<li><span class="card-name empty"></span><span class="icon-X"></span></li>
						<li><span class="card-name empty"></span><span class="icon-X"></span></li>
					</ul><a id="compare-card-action-mobile" class="button-compare"><img src="../../../../iwov-resources/images/card-compare-landing/icon-button-compare.png" alt="icon compare"/><span>Compare Cards</span><span class="count">0/2</span></a><a id="compare-card-arrow" class="button-double-arrow"><span class="icon-button-double-arrow"></span></a>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row sticky-wrapper">
				<div class="card-compare-display-continer">
					<div class="cards-list">
						<div class="compare-cards-result">
							<h2 class="heading2">Compare cards</h2>
							<div data-uob-tg-desktop="show" class="button-compare-tab compare-button-mobile clear-all"><a id="compare-card-clear-all" class="button-compare"><span>Clear all cards</span><span class="count">X</span></a></div>
							<div class="row card-row">
								<div class="col-md-3 col-sm-6 col-xs-6">
									<div class="card-item card-add-plus"><strong><span class="card-name text-white">Credit cards</span></strong>
										<div class="thumb-img"><a href="javascript:void(0);" title="add credit card" class="add-credit-card"><img src="../../../../iwov-resources/images/card-compare-landing/add-card.jpg" alt="add credit card"/>
												<div class="add-btn"><span>Add card</span><img src="../../../../iwov-resources/images/card-compare-landing/add-card-plus.png" alt="add credit card"/></div></a></div>
									</div>
								</div>
								<div class="col-md-3 col-sm-6 col-xs-6">
									<div class="card-item card-add-plus"><strong><span class="card-name text-white">Credit cards</span></strong>
										<div class="thumb-img"><a href="javascript:void(0);" title="add credit card" class="add-credit-card"><img src="../../../../iwov-resources/images/card-compare-landing/add-card.jpg" alt="add credit card"/>
												<div class="add-btn"><span>Add card</span><img src="../../../../iwov-resources/images/card-compare-landing/add-card-plus.png" alt="add credit card"/></div></a></div>
									</div>
								</div>
								<div class="col-md-3 col-sm-6 col-xs-6">
									<div class="card-item card-add-plus"><strong><span class="card-name text-white">Credit cards</span></strong>
										<div class="thumb-img"><a href="javascript:void(0);" title="add credit card" class="add-credit-card"><img src="../../../../iwov-resources/images/card-compare-landing/add-card.jpg" alt="add credit card"/>
												<div class="add-btn"><span>Add card</span><img src="../../../../iwov-resources/images/card-compare-landing/add-card-plus.png" alt="add credit card"/></div></a></div>
									</div>
								</div>
								<div class="col-md-3 col-sm-6 col-xs-6">
									<div class="card-item card-add-plus"><strong><span class="card-name text-white">Credit cards</span></strong>
										<div class="thumb-img"><a href="javascript:void(0);" title="add credit card" class="add-credit-card"><img src="../../../../iwov-resources/images/card-compare-landing/add-card.jpg" alt="add credit card"/>
												<div class="add-btn"><span>Add card</span><img src="../../../../iwov-resources/images/card-compare-landing/add-card-plus.png" alt="add credit card"/></div></a></div>
									</div>
								</div>
								<div class="col-md-3 col-sm-6 hidden">
									<div class="card-item card-add-plus hidden"><strong><span class="card-name text-white">Credit cards</span></strong>
										<div class="thumb-img"><a href="javascript:void(0);" title="add credit card" class="add-credit-card"><img src="../../../../iwov-resources/images/card-compare-landing/add-card.jpg" alt="add credit card"/>
												<div class="add-btn"><span>Add card</span><img src="../../../../iwov-resources/images/card-compare-landing/add-card-plus.png" alt="add credit card"/></div></a></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- below tabs -->

	</xsl:template>

	<!--- Cards display row template -->
	<xsl:template name="cardsload">

		<xsl:param name="nodeName"/>
		<xsl:param name="position"/>
		<!-- Credit cards display starts here -->



		<xsl:for-each select="$nodeName/card_highlights">

			<xsl:variable name="pagelink" select="$nodeName/@url"/>
			<xsl:variable name="dcrlink" select="$nodeName/@filepath"/>

			<xsl:variable name="pagelinkvalue">
				<xsl:value-of select="$pagelink"/>
			</xsl:variable>

			<div class="col-md-3 col-sm-6">

				<div class="card-item"><strong><span class="card-name">
							<xsl:value-of select="card_title"/>
						</span></strong>
					<div class="thumb-img">
						<a>
							<xsl:attribute name="href">
								<xsl:value-of select="tile_image_link"/>
							</xsl:attribute>
							<xsl:attribute name="title">
								<xsl:value-of select="card_subhead"/>
							</xsl:attribute>
							<img>
								<xsl:attribute name="src">
									<xsl:value-of select="tile_image"/>
								</xsl:attribute>
								<xsl:attribute name="alt">
									<xsl:value-of select="card_image_alt"/>
								</xsl:attribute>
							</img>
						</a>
					</div>
					<div class="onoffswitch">
						<input type="checkbox" name="onoffswitch" >
							<xsl:attribute name="id">
								<xsl:text>myonoffswitch-</xsl:text><xsl:value-of select="concat($position,position())"/>
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>onoffswitch-checkbox</xsl:text>
							</xsl:attribute>
						</input>
						<label>
							<xsl:attribute name="for">
								<xsl:text>myonoffswitch-</xsl:text><xsl:value-of select="concat($position,position())"/>
							</xsl:attribute>
							<xsl:attribute name="class">
								<xsl:text>onoffswitch-label</xsl:text>
							</xsl:attribute>
							<span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span>
						</label>
						<span class="text">Compare</span>
					</div>
					<strong>
						<span class="card-desc">
							<xsl:value-of select="card_subhead"/>
						</span>
					</strong>
					<xsl:value-of select="tile_summary" disable-output-escaping="yes" />
					<div class="card-detail">
					
						<xsl:variable name="finallink">
							<xsl:value-of select="replace(replace($pagelinkvalue,'.page',''),'/sites/en/','')"/>
						</xsl:variable>
						
						<a title="View details"><xsl:attribute name="href">$PAGE_LINK[<xsl:value-of select="$finallink"/>]</xsl:attribute>View details</a>
						

					</div>
					<div class="center-block">
						<a title="Apply now" class="btn-1 apply-btn">
							<xsl:attribute name="href"><xsl:value-of select="apply_now_link"/></xsl:attribute>
					Apply</a>
					</div>
				</div>
			</div>

		</xsl:for-each>

		<!-- Credit cards display ends here -->

	</xsl:template>
	
</xsl:stylesheet>