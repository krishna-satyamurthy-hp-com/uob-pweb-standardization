<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productlanding/tiled_display_2.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productlanding/tiled_display_3.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productlanding/tiled_display_4.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productlanding/apply_now.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productlanding/accordion.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productlanding/description_free_text.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productlanding/menu_3_column.xsl"/>
	<xsl:include href="http://www.interwoven.com/custom/iw/xsl/productlanding/img_3_colum.xsl"/>

	<xsl:template name="productlanding">
		<!--- tabbed sections handled here -->
		<div class="container">
			<div>
				<xsl:attribute name="class">
					<xsl:text>row sticky-wrapper </xsl:text>
					<xsl:choose>
						<xsl:when test="count(Properties/Data/Datum/DCR/root/feature_segment) >= 6">
							<xsl:text>col-6</xsl:text>
						</xsl:when>
						<xsl:when test="count(Properties/Data/Datum/DCR/root/feature_segment) = 5">
							<xsl:text>col-5</xsl:text>
						</xsl:when>
						<xsl:when test="count(Properties/Data/Datum/DCR/root/feature_segment) = 4">
							<xsl:text>col-4</xsl:text>
						</xsl:when>
						<xsl:when test="count(Properties/Data/Datum/DCR/root/feature_segment) = 3">
							<xsl:text>col-3</xsl:text>
						</xsl:when>
						<xsl:otherwise>
							<xsl:text>col-2</xsl:text>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:attribute>
				<div class="sticky-nav affix-top" data-tab="">
					<ul role="tablist" class="nav-heading list-unstyled">
						<xsl:for-each select="Properties/Data/Datum/DCR/root/feature_segment">
							<xsl:variable name="lowercase-text">
								<xsl:call-template name="to-lowercase">
									<xsl:with-param name="string" select="title"/>
								</xsl:call-template>
							</xsl:variable>
							<li>
								<xsl:if test="position() = 1">
									<xsl:attribute name="class">
										<xsl:text>active</xsl:text>
									</xsl:attribute>
								</xsl:if>
								<a data-toggle="tab" role="tab" >
									<xsl:attribute name="title">
										<xsl:value-of select="$lowercase-text"/>
									</xsl:attribute>
									<xsl:attribute name="href">
										<xsl:text>#</xsl:text><xsl:value-of select="translate($lowercase-text,' ','-')"/><xsl:text>-tab</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="aria-controls">
										<xsl:value-of select="translate($lowercase-text,' ','-')"/><xsl:text>-tab</xsl:text>
									</xsl:attribute>
									<xsl:attribute name="aria-selected">
										<xsl:choose>
											<xsl:when test="position() = 1">
												<xsl:attribute name="aria-selected">
													<xsl:text>true</xsl:text>
												</xsl:attribute>
											</xsl:when>
											<xsl:when test="position() != 1">
												<xsl:attribute name="aria-selected">
													<xsl:text>false</xsl:text>
												</xsl:attribute>
											</xsl:when>
											<xsl:otherwise>
											</xsl:otherwise>
										</xsl:choose>
									</xsl:attribute>
									<xsl:value-of select="title"/>
								</a>
							</li>
						</xsl:for-each>
					</ul>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row sticky-wrapper">
				<section class="product-tabs">
					<div class="tab-content">
						<xsl:for-each select="Properties/Data/Datum/DCR/root/feature_segment">

							<xsl:variable name="lowercase-text">
								<xsl:call-template name="to-lowercase">
									<xsl:with-param name="string" select="title"/>
								</xsl:call-template>
							</xsl:variable>

							<div role="tabpanel" >
								<xsl:attribute name="id">
									<xsl:value-of select="translate($lowercase-text,' ','-')"/><xsl:text>-tab</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="aria-labelledby">
									<xsl:value-of select="translate($lowercase-text,' ','-')"/><xsl:text>-tab</xsl:text>
								</xsl:attribute>
								<xsl:attribute name="class">
									<xsl:value-of select="$lowercase-text"/><xsl:text>-tab tab-pane fade</xsl:text>
									<xsl:if test="position() = 1">
										<xsl:text> active in</xsl:text>
									</xsl:if>

								</xsl:attribute>

								<div class="grid-wrapper pusher-t-45">
									<xsl:for-each select="features/*">
										<xsl:choose>
											<xsl:when test="local-name()='tiled_display_2'">
												<xsl:call-template name="tiled_display_2" />
											</xsl:when>
											<xsl:when test="local-name()='tiled_display_3'">
												<xsl:call-template name="tiled_display_3" />
											</xsl:when>
											<xsl:when test="local-name()='tiled_display_4'">
												<xsl:call-template name="tiled_display_4" />
											</xsl:when>
											<xsl:when test="local-name()='apply_now'">
												<xsl:call-template name="apply_now" />
											</xsl:when>
											<xsl:when test="local-name()='accordion'">
												<xsl:call-template name="accordion" />
											</xsl:when>
											<xsl:when test="local-name()='description_free_text'">
												<xsl:call-template name="description_free_text" />
											</xsl:when>
											<xsl:when test="local-name()='menu_3_column'">
												<xsl:call-template name="menu_3_column" />
											</xsl:when>
											<xsl:otherwise>Failed to find XSL</xsl:otherwise>
										</xsl:choose>

									</xsl:for-each>
								</div>
							</div>
						</xsl:for-each>
					
					</div>
				</section>
			</div>
		</div>

		<!--- the non tabbed sections start form here -->
		<xsl:for-each select="Properties/Data/Datum/DCR/root/non_feature_segment">

			<xsl:variable name="lowercase-text">
				<xsl:call-template name="to-lowercase">
					<xsl:with-param name="string" select="title"/>
				</xsl:call-template>
			</xsl:variable>


			<div class="container">
				<div class="row sticky-wrapper">

					<section>

						<xsl:attribute name="class">
							<xsl:choose>
								<xsl:when test="title != ''">
									<xsl:value-of select="translate($lowercase-text,' ','-')"/>-block</xsl:when>
								<xsl:otherwise>
									<xsl:text>other-info-block</xsl:text>
								</xsl:otherwise>
							</xsl:choose>
							<xsl:if test="position() = 1"><xsl:text> pusher-t-30 </xsl:text></xsl:if>
							<xsl:text> pusher-b-30</xsl:text>
						</xsl:attribute>

						<xsl:if test="title != ''">
							<h2 class="heading2"><xsl:value-of select="title" /></h2>
						</xsl:if>
						<xsl:for-each select="features/*">
										<xsl:choose>
											<xsl:when test="local-name()='tiled_display_2'">
												<xsl:call-template name="tiled_display_2" />
											</xsl:when>
											<xsl:when test="local-name()='tiled_display_3'">
												<xsl:call-template name="tiled_display_3" />
											</xsl:when>
											<xsl:when test="local-name()='tiled_display_4'">
												<xsl:call-template name="tiled_display_4" />
											</xsl:when>
											<xsl:when test="local-name()='apply_now'">
												<xsl:call-template name="apply_now" />
											</xsl:when>
											<xsl:when test="local-name()='accordion'">
												<xsl:call-template name="accordion" />
											</xsl:when>
											<xsl:when test="local-name()='description_free_text'">
												<xsl:call-template name="description_free_text" />
											</xsl:when>
											<xsl:when test="local-name()='menu_3_column'">
												<div class="container outer">
													<xsl:call-template name="menu_3_column" />
												</div>
											</xsl:when>
											<xsl:when test="local-name()='img_3_colum'">
												<xsl:call-template name="img_3_colum" />
											</xsl:when>
											<xsl:otherwise>Failed to find XSL</xsl:otherwise>
										</xsl:choose>

									</xsl:for-each>
					</section>
				</div>
			</div>
		</xsl:for-each>
<script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/productlanding/jquery.min.js"></script>
<script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/productlanding/bootstrap.min.js"></script>
<script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/productlanding/plugins.min.js"></script>	
<script type="text/javascript" src="$URL_PREFIX/iwov-resources/js/productlanding/main.js"></script>
	</xsl:template>
</xsl:stylesheet>
