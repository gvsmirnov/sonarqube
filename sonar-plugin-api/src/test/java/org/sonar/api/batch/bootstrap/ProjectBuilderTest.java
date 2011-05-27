/*
 * Sonar, open source software quality management tool.
 * Copyright (C) 2008-2011 SonarSource
 * mailto:contact AT sonarsource DOT com
 *
 * Sonar is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * Sonar is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with Sonar; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02
 */
package org.sonar.api.batch.bootstrap;

import org.junit.Test;

import java.io.File;
import java.util.Properties;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

public class ProjectBuilderTest {

  @Test
  public void shouldBuild() {
    FakeProjectBuilder builder = new FakeProjectBuilder(new ProjectReactor(new ProjectDefinition(new File("."), new File("."), new Properties())));
    builder.start();

    assertThat(builder.built, is(true));
  }

  private static class FakeProjectBuilder extends ProjectBuilder {
    private boolean built=false;

    FakeProjectBuilder(final ProjectReactor reactor) {
      super(reactor);
    }

    @Override
    protected void build(ProjectReactor reactor) {
      built=true;
    }
  }
}
